import { GameState, ColorTheme } from '../types';
import { getThemeColors } from '../utils/themes';

interface GameBoardProps {
  gameState: GameState;
  colorTheme: ColorTheme;
  className?: string;
}

export const GameBoard = ({ gameState, colorTheme, className = '' }: GameBoardProps) => {
  const { playerSnake, aiSnake, food, gridSize } = gameState;
  const theme = getThemeColors(colorTheme);

  const getCellType = (x: number, y: number): string => {
    // Check if position is player snake head
    if (playerSnake.positions[0].x === x && playerSnake.positions[0].y === y) {
      return theme.playerSnake.head;
    }
    
    // Check if position is player snake body
    if (playerSnake.positions.slice(1).some(pos => pos.x === x && pos.y === y)) {
      return theme.playerSnake.body;
    }
    
    // Check if position is AI snake head
    if (aiSnake.positions[0].x === x && aiSnake.positions[0].y === y) {
      return theme.aiSnake.head;
    }
    
    // Check if position is AI snake body
    if (aiSnake.positions.slice(1).some(pos => pos.x === x && pos.y === y)) {
      return theme.aiSnake.body;
    }
    
    // Check if position has food
    if (food.some(f => f.x === x && f.y === y)) {
      return `${theme.food} rounded-full`;
    }
    
    return '';
  };

  const cellSize = gridSize === 20 ? 'w-4 h-4' : gridSize === 30 ? 'w-3 h-3' : 'w-2 h-2';

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cellType = getCellType(x, y);
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`${cellSize} border ${theme.grid} ${cellType}`}
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
      className={`inline-grid gap-0 border-2 ${theme.grid} ${theme.background} p-2 ${className}`}
      style={{ 
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
      }}
    >
      {renderGrid()}
    </div>
  );
};
