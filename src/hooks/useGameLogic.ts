import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Direction, GameConfig, Position } from '../types';
import { 
  createInitialGameState, 
  moveSnake, 
  checkCollision, 
  checkSelfCollision, 
  checkSnakeCollision, 
  checkFoodEaten, 
  growSnake, 
  getAllOccupiedPositions,
  isValidDirection,
  getFruitCount
} from '../utils/gameLogic';
import { ApiService } from '../services';

export const useGameLogic = (config: GameConfig) => {
  const [gameState, setGameState] = useState<GameState>(() => 
    createInitialGameState(config.gridSize)
  );
  const [isAPIConnected, setIsAPIConnected] = useState(false);
  
  const gameLoopRef = useRef<number | null>(null);
  const currentDirectionRef = useRef<Direction>('RIGHT');
  const gameStateRef = useRef<GameState>(gameState);

  // Update ref when state changes
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Check API connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await ApiService.checkHealthStatus();
      setIsAPIConnected(connected);
    };
    checkConnection();
  }, []);

  const resetGame = useCallback(() => {
    if (gameLoopRef.current) {
      clearTimeout(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    setGameState(createInitialGameState(config.gridSize));
    currentDirectionRef.current = 'RIGHT';
  }, [config.gridSize]);

  const updatePlayerDirection = useCallback((direction: Direction) => {
    if (gameState.gameStatus === 'playing' && 
        isValidDirection(gameState.playerSnake.direction, direction)) {
      currentDirectionRef.current = direction;
    }
  }, [gameState.gameStatus, gameState.playerSnake.direction]);

  const gameLoop = useCallback(async () => {
    const currentState = gameStateRef.current;
    
    if (currentState.gameStatus !== 'playing') {
      return;
    }

    // Move player snake first
    const newPlayerSnake = moveSnake(currentState.playerSnake, currentDirectionRef.current);
    
    // Create updated game state for AI calculation
    const gameStateForAI = {
      ...currentState,
      playerSnake: {
        ...newPlayerSnake,
        direction: currentDirectionRef.current,
      },
    };

    // Get AI move based on updated game state
    let aiDirection: Direction = 'UP';
    if (isAPIConnected) {
      try {
        aiDirection = await ApiService.getAIMove(gameStateForAI, config.algorithm);
      } catch (error) {
        console.error('Failed to get AI move:', error);
        // Fallback to simple direction
        aiDirection = currentState.aiSnake.direction;
      }
    } else {
      // Simple fallback AI when backend is not available
      aiDirection = currentState.aiSnake.direction;
    }

    // Move AI snake
    const newAiSnake = moveSnake(currentState.aiSnake, aiDirection);

    setGameState(currentState => {
      if (currentState.gameStatus !== 'playing') {
        return currentState;
      }

      let finalPlayerSnake = newPlayerSnake;
      let newAiSnake_ = newAiSnake;
      let newFood = currentState.food;
      let newScore = currentState.score;
      let gameStatus: GameState['gameStatus'] = currentState.gameStatus;
      let winner: GameState['winner'] = currentState.winner;

      // Check collisions
      const playerHitWall = checkCollision(finalPlayerSnake.positions[0], currentState.gridSize);
      const playerHitSelf = checkSelfCollision(finalPlayerSnake);
      const playerHitAI = checkSnakeCollision(finalPlayerSnake, newAiSnake_);
      
      const aiHitWall = checkCollision(newAiSnake_.positions[0], currentState.gridSize);
      const aiHitSelf = checkSelfCollision(newAiSnake_);
      const aiHitPlayer = checkSnakeCollision(newAiSnake_, finalPlayerSnake);

      // Determine winner based on collisions
      const playerDied = playerHitWall || playerHitSelf || playerHitAI;
      const aiDied = aiHitWall || aiHitSelf || aiHitPlayer;

      if (playerDied || aiDied) {
        gameStatus = 'gameOver';
        if (playerDied && aiDied) {
          winner = 'tie';
        } else if (playerDied) {
          winner = 'ai';
        } else {
          winner = 'player';
        }
      } else {
        // Check food consumption
        const playerEatenFood = checkFoodEaten(finalPlayerSnake.positions[0], currentState.food);
        const aiEatenFood = checkFoodEaten(newAiSnake_.positions[0], currentState.food);
        
        if (playerEatenFood || aiEatenFood) {
          let newFoodArray = [...currentState.food];
          
          if (playerEatenFood) {
            finalPlayerSnake = growSnake(finalPlayerSnake);
            newScore = { ...newScore, player: newScore.player + 1 };
            // Remove eaten food
            newFoodArray = newFoodArray.filter(f => f.x !== playerEatenFood.x || f.y !== playerEatenFood.y);
          }
          
          if (aiEatenFood) {
            newAiSnake_ = growSnake(newAiSnake_);
            newScore = { ...newScore, ai: newScore.ai + 1 };
            // Remove eaten food (if different from player's)
            if (!playerEatenFood || (playerEatenFood.x !== aiEatenFood.x || playerEatenFood.y !== aiEatenFood.y)) {
              newFoodArray = newFoodArray.filter(f => f.x !== aiEatenFood.x || f.y !== aiEatenFood.y);
            }
          }
          
          // Generate new fruits to replace eaten ones
          const allPositions = getAllOccupiedPositions(finalPlayerSnake, newAiSnake_);
          const currentFruitCount = getFruitCount(currentState.gridSize as any);
          
          // Only generate new fruits if we have fewer fruits than required
          if (newFoodArray.length < currentFruitCount) {
            const fruitsNeeded = currentFruitCount - newFoodArray.length;
            for (let i = 0; i < fruitsNeeded; i++) {
              let newFruit: Position;
              let attempts = 0;
              do {
                newFruit = {
                  x: Math.floor(Math.random() * currentState.gridSize),
                  y: Math.floor(Math.random() * currentState.gridSize),
                };
                attempts++;
              } while (
                (allPositions.some(pos => pos.x === newFruit.x && pos.y === newFruit.y) ||
                 newFoodArray.some(f => f.x === newFruit.x && f.y === newFruit.y)) &&
                attempts < 100
              );
              newFoodArray.push(newFruit);
            }
          }
          
          newFood = newFoodArray;
        }
      }

      return {
        ...currentState,
        playerSnake: finalPlayerSnake,
        aiSnake: newAiSnake_,
        food: newFood,
        score: newScore,
        gameStatus,
        winner,
      };
    });
  }, [config.algorithm, isAPIConnected]);

  const startGame = useCallback(() => {
    if (gameState.gameStatus === 'waiting' || gameState.gameStatus === 'paused') {
      setGameState(prev => ({ ...prev, gameStatus: 'playing' }));
    } else if (gameState.gameStatus === 'gameOver') {
      // Auto-reset when starting after game over
      const newGameState = createInitialGameState(config.gridSize);
      setGameState({ ...newGameState, gameStatus: 'playing' });
      currentDirectionRef.current = 'RIGHT';
    }
    
    const runGameLoop = () => {
      gameLoop();
      gameLoopRef.current = setTimeout(runGameLoop, config.gameSpeed);
    };
    
    if (gameLoopRef.current) {
      clearTimeout(gameLoopRef.current);
    }
    runGameLoop();
  }, [gameState.gameStatus, gameLoop, config.gameSpeed, config.gridSize]);

  const pauseGame = useCallback(() => {
    if (gameLoopRef.current) {
      clearTimeout(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    setGameState(prev => ({ ...prev, gameStatus: 'paused' }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, []);

  // Handle game over
  useEffect(() => {
    if (gameState.gameStatus === 'gameOver' && gameLoopRef.current) {
      clearTimeout(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, [gameState.gameStatus]);

  return {
    gameState,
    isAPIConnected,
    startGame,
    pauseGame,
    resetGame,
    updatePlayerDirection,
  };
};
