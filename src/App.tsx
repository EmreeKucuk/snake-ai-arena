import { useState, useEffect } from 'react';
import { 
  GameBoard, 
  AlgorithmSelector, 
  GameStats, 
  GameControls 
} from './components';
import { useGameLogic } from './hooks';
import { Algorithm, Direction, GameConfig } from './types';
import { INITIAL_GAME_SPEED } from './utils/gameLogic';
import { Bot, Wifi, WifiOff } from 'lucide-react';

const App = () => {
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    gridSize: 20,
    gameSpeed: INITIAL_GAME_SPEED,
    algorithm: 'random',
  });

  const {
    gameState,
    isAPIConnected,
    startGame,
    pauseGame,
    resetGame,
    updatePlayerDirection,
  } = useGameLogic(gameConfig);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState.gameStatus !== 'playing') return;

      let direction: Direction | null = null;
      
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = 'RIGHT';
          break;
        case ' ':
          event.preventDefault();
          if (gameState.gameStatus === 'playing') {
            pauseGame();
          } else {
            startGame();
          }
          return;
      }

      if (direction) {
        event.preventDefault();
        updatePlayerDirection(direction);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameStatus, updatePlayerDirection, pauseGame, startGame]);

  const handleAlgorithmChange = (algorithm: Algorithm) => {
    if (gameState.gameStatus === 'waiting') {
      setGameConfig(prev => ({ ...prev, algorithm }));
    }
  };

  const handleSpeedChange = (speed: number) => {
    setGameConfig(prev => ({ ...prev, gameSpeed: speed }));
  };

  const isGameControlsDisabled = gameState.gameStatus === 'playing';

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot size={32} className="text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Snake AI Arena</h1>
            <Bot size={32} className="text-red-400" />
          </div>
          <p className="text-gray-400">
            Compete against AI-powered snakes using different pathfinding algorithms
          </p>
          
          {/* API Status */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {isAPIConnected ? (
              <>
                <Wifi size={16} className="text-green-400" />
                <span className="text-sm text-green-400">AI Backend Connected</span>
              </>
            ) : (
              <>
                <WifiOff size={16} className="text-red-400" />
                <span className="text-sm text-red-400">AI Backend Disconnected</span>
              </>
            )}
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Algorithm Selection */}
          <div className="lg:col-span-1 space-y-6">
            <AlgorithmSelector
              selectedAlgorithm={gameConfig.algorithm}
              onAlgorithmChange={handleAlgorithmChange}
              disabled={isGameControlsDisabled}
            />
            
            {/* Game Speed Control */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">Game Speed</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="25"
                  value={gameConfig.gameSpeed}
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  disabled={isGameControlsDisabled}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Fast</span>
                  <span>{gameConfig.gameSpeed}ms</span>
                  <span>Slow</span>
                </div>
              </div>
            </div>

            {/* Controls Help */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">Controls</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <div>🎮 Arrow Keys or WASD to move</div>
                <div>⏸️ Space to pause/resume</div>
                <div>🔄 Reset to restart game</div>
              </div>
            </div>
          </div>

          {/* Center Panel - Game Board */}
          <div className="lg:col-span-1 flex flex-col items-center space-y-6">
            <GameBoard gameState={gameState} />
            
            <GameControls
              isPlaying={gameState.gameStatus === 'playing'}
              isPaused={gameState.gameStatus === 'paused'}
              onStart={startGame}
              onPause={pauseGame}
              onReset={resetGame}
            />
          </div>

          {/* Right Panel - Game Stats */}
          <div className="lg:col-span-1">
            <GameStats gameState={gameState} />
            
            {/* Algorithm Info */}
            {gameConfig.algorithm && (
              <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-3">Current AI</h3>
                <div className="text-sm text-gray-300">
                  <div className="font-medium text-white mb-1">
                    {gameConfig.algorithm.toUpperCase()}
                  </div>
                  <div>
                    {gameConfig.algorithm === 'random' && 'Moves randomly without any strategy'}
                    {gameConfig.algorithm === 'greedy' && 'Always moves towards the food'}
                    {gameConfig.algorithm === 'bfs' && 'Finds shortest path using breadth-first search'}
                    {gameConfig.algorithm === 'dfs' && 'Explores paths using depth-first search'}
                    {gameConfig.algorithm === 'dijkstra' && 'Optimal pathfinding with weighted edges'}
                    {gameConfig.algorithm === 'astar' && 'Heuristic-based optimal pathfinding'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
