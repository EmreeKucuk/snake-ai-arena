import { GameState } from '../types';
import { Trophy, User, Bot } from 'lucide-react';

interface GameStatsProps {
  gameState: GameState;
  className?: string;
}

export const GameStats = ({ gameState, className = '' }: GameStatsProps) => {
  const { score, gameStatus, winner } = gameState;

  const getStatusColor = () => {
    switch (gameStatus) {
      case 'playing':
        return 'text-green-400';
      case 'paused':
        return 'text-yellow-400';
      case 'gameOver':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = () => {
    switch (gameStatus) {
      case 'playing':
        return 'Game Running';
      case 'paused':
        return 'Game Paused';
      case 'gameOver':
        return winner ? `${winner === 'player' ? 'You Win!' : winner === 'ai' ? 'AI Wins!' : 'Tie!'}` : 'Game Over';
      case 'waiting':
        return 'Press Start to Play';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <div className={`bg-gray-800 p-4 rounded-lg border border-gray-700 ${className}`}>
      {/* Game Status */}
      <div className="mb-4 text-center">
        <h3 className={`text-lg font-bold ${getStatusColor()}`}>
          {getStatusText()}
        </h3>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-green-900/30 rounded-lg border border-green-600">
          <div className="flex items-center justify-center gap-2 mb-1">
            <User size={18} className="text-green-400" />
            <span className="text-sm font-medium text-green-400">Player</span>
          </div>
          <div className="text-2xl font-bold text-white">{score.player}</div>
        </div>
        
        <div className="text-center p-3 bg-red-900/30 rounded-lg border border-red-600">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Bot size={18} className="text-red-400" />
            <span className="text-sm font-medium text-red-400">AI</span>
          </div>
          <div className="text-2xl font-bold text-white">{score.ai}</div>
        </div>
      </div>

      {/* Winner Display */}
      {gameStatus === 'gameOver' && winner && (
        <div className="text-center p-3 bg-yellow-900/30 rounded-lg border border-yellow-600">
          <Trophy className="mx-auto mb-2 text-yellow-400" size={24} />
          <div className="text-lg font-bold text-yellow-400">
            {winner === 'player' ? 'Victory!' : winner === 'ai' ? 'AI Victory!' : 'Draw!'}
          </div>
        </div>
      )}

      {/* Game Info */}
      <div className="mt-4 text-xs text-gray-400 space-y-1">
        <div>Grid Size: {gameState.gridSize}×{gameState.gridSize}</div>
        <div>Snake Length: Player {gameState.playerSnake.positions.length}, AI {gameState.aiSnake.positions.length}</div>
      </div>
    </div>
  );
};
