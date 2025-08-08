import { GameState } from '../types';

interface GameBoardProps {
  gameState: GameState;
  className?: string;
}

export const GameBoard = ({ gameState, className = '' }: GameBoardProps) => {
  const { playerSnake, aiSnake, food, gridSize } = gameState;

  const getCellType = (x: number, y: number): string => {
    // Check if position is player snake head
    if (playerSnake.positions[0].x === x && playerSnake.positions[0].y === y) {
      return 'snake-head';
    }
    
    // Check if position is player snake body
    if (playerSnake.positions.slice(1).some(pos => pos.x === x && pos.y === y)) {
      return 'snake-body';
    }
    
    // Check if position is AI snake head
    if (aiSnake.positions[0].x === x && aiSnake.positions[0].y === y) {
      return 'ai-snake-head';
    }
    
    // Check if position is AI snake body
    if (aiSnake.positions.slice(1).some(pos => pos.x === x && pos.y === y)) {
      return 'ai-snake-body';
    }
    
    // Check if position is food
    if (food.x === x && food.y === y) {
      return 'food';
    }
    
    return 'game-cell';
  };

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cellType = getCellType(x, y);
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`game-cell ${cellType}`}
            data-x={x}
            data-y={y}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div 
      className={`inline-grid gap-0 border-2 border-gray-600 bg-gray-800 p-2 ${className}`}
      style={{ 
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
      }}
    >
      {renderGrid()}
    </div>
  );
};
