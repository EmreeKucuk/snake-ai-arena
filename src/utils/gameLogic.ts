import { Position, Direction, GameState, Snake } from '../types';

export const GRID_SIZE = 20;
export const INITIAL_GAME_SPEED = 150; // milliseconds

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

export function createInitialGameState(gridSize: number = GRID_SIZE): GameState {
  const playerStartX = Math.floor(gridSize / 4);
  const aiStartX = Math.floor((gridSize * 3) / 4);
  const startY = Math.floor(gridSize / 2);

  return {
    playerSnake: {
      positions: [
        { x: playerStartX, y: startY },
        { x: playerStartX - 1, y: startY },
        { x: playerStartX - 2, y: startY },
      ],
      direction: 'RIGHT',
    },
    aiSnake: {
      positions: [
        { x: aiStartX, y: startY },
        { x: aiStartX + 1, y: startY },
        { x: aiStartX + 2, y: startY },
      ],
      direction: 'LEFT',
    },
    food: generateFood(gridSize, []),
    gridSize,
    score: { player: 0, ai: 0 },
    gameStatus: 'waiting',
  };
}

export function generateFood(gridSize: number, occupiedPositions: Position[]): Position {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (occupiedPositions.some(pos => pos.x === food.x && pos.y === food.y));
  
  return food;
}

export function moveSnake(snake: Snake, direction: Direction): Snake {
  const head = snake.positions[0];
  const directionVector = DIRECTIONS[direction];
  
  const newHead: Position = {
    x: head.x + directionVector.x,
    y: head.y + directionVector.y,
  };
  
  return {
    ...snake,
    direction,
    positions: [newHead, ...snake.positions.slice(0, -1)],
  };
}

export function checkCollision(position: Position, gridSize: number): boolean {
  return (
    position.x < 0 ||
    position.x >= gridSize ||
    position.y < 0 ||
    position.y >= gridSize
  );
}

export function checkSelfCollision(snake: Snake): boolean {
  const head = snake.positions[0];
  return snake.positions.slice(1).some(
    segment => segment.x === head.x && segment.y === head.y
  );
}

export function checkSnakeCollision(snake1: Snake, snake2: Snake): boolean {
  const head1 = snake1.positions[0];
  return snake2.positions.some(
    segment => segment.x === head1.x && segment.y === head1.y
  );
}

export function checkFoodEaten(snakeHead: Position, food: Position): boolean {
  return snakeHead.x === food.x && snakeHead.y === food.y;
}

export function growSnake(snake: Snake): Snake {
  const tail = snake.positions[snake.positions.length - 1];
  return {
    ...snake,
    positions: [...snake.positions, tail],
  };
}

export function isValidDirection(currentDirection: Direction, newDirection: Direction): boolean {
  return OPPOSITE_DIRECTIONS[currentDirection] !== newDirection;
}

export function getAllOccupiedPositions(playerSnake: Snake, aiSnake: Snake): Position[] {
  return [...playerSnake.positions, ...aiSnake.positions];
}
