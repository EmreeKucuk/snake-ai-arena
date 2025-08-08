import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Direction, GameConfig } from '../types';
import { 
  createInitialGameState, 
  moveSnake, 
  checkCollision, 
  checkSelfCollision, 
  checkSnakeCollision, 
  checkFoodEaten, 
  growSnake, 
  generateFood, 
  getAllOccupiedPositions,
  isValidDirection
} from '../utils/gameLogic';
import { ApiService } from '../services';

export const useGameLogic = (config: GameConfig) => {
  const [gameState, setGameState] = useState<GameState>(() => 
    createInitialGameState(config.gridSize)
  );
  const [isAPIConnected, setIsAPIConnected] = useState(false);
  
  const gameLoopRef = useRef<number | null>(null);
  const currentDirectionRef = useRef<Direction>('RIGHT');

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
    setGameState(currentState => {
      if (currentState.gameStatus !== 'playing') {
        return currentState;
      }

      // Move player snake
      const newPlayerSnake = moveSnake(currentState.playerSnake, currentDirectionRef.current);
      
      // We'll get AI move and update in the next tick
      return {
        ...currentState,
        playerSnake: {
          ...newPlayerSnake,
          direction: currentDirectionRef.current,
        },
      };
    });

    // Get AI move
    let aiDirection: Direction = 'UP';
    if (isAPIConnected) {
      try {
        aiDirection = await ApiService.getAIMove(gameState, config.algorithm);
      } catch (error) {
        console.error('Failed to get AI move:', error);
        // Fallback to simple direction
        aiDirection = gameState.aiSnake.direction;
      }
    } else {
      // Simple fallback AI when backend is not available
      aiDirection = gameState.aiSnake.direction;
    }

    setGameState(currentState => {
      if (currentState.gameStatus !== 'playing') {
        return currentState;
      }

      const playerSnake = currentState.playerSnake;
      const newAiSnake = moveSnake(currentState.aiSnake, aiDirection);
      
      let newPlayerSnake = playerSnake;
      let newAiSnake_ = newAiSnake;
      let newFood = currentState.food;
      let newScore = currentState.score;
      let gameStatus: GameState['gameStatus'] = currentState.gameStatus;
      let winner: GameState['winner'] = currentState.winner;

      // Check collisions
      const playerHitWall = checkCollision(playerSnake.positions[0], currentState.gridSize);
      const playerHitSelf = checkSelfCollision(playerSnake);
      const playerHitAI = checkSnakeCollision(playerSnake, newAiSnake_);
      
      const aiHitWall = checkCollision(newAiSnake_.positions[0], currentState.gridSize);
      const aiHitSelf = checkSelfCollision(newAiSnake_);
      const aiHitPlayer = checkSnakeCollision(newAiSnake_, playerSnake);

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
        const playerAteFood = checkFoodEaten(playerSnake.positions[0], currentState.food);
        const aiAteFood = checkFoodEaten(newAiSnake_.positions[0], currentState.food);
        
        if (playerAteFood || aiAteFood) {
          if (playerAteFood) {
            newPlayerSnake = growSnake(playerSnake);
            newScore = { ...newScore, player: newScore.player + 1 };
          }
          
          if (aiAteFood) {
            newAiSnake_ = growSnake(newAiSnake_);
            newScore = { ...newScore, ai: newScore.ai + 1 };
          }
          
          // Generate new food
          const allPositions = getAllOccupiedPositions(newPlayerSnake, newAiSnake_);
          newFood = generateFood(currentState.gridSize, allPositions);
        }
      }

      return {
        ...currentState,
        playerSnake: newPlayerSnake,
        aiSnake: newAiSnake_,
        food: newFood,
        score: newScore,
        gameStatus,
        winner,
      };
    });
  }, [gameState, config.algorithm, isAPIConnected]);

  const startGame = useCallback(() => {
    if (gameState.gameStatus === 'waiting' || gameState.gameStatus === 'paused') {
      setGameState(prev => ({ ...prev, gameStatus: 'playing' }));
      
      const runGameLoop = () => {
        gameLoop();
        gameLoopRef.current = setTimeout(runGameLoop, config.gameSpeed);
      };
      
      runGameLoop();
    }
  }, [gameState.gameStatus, gameLoop, config.gameSpeed]);

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
