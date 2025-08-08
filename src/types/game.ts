export interface Position {
  x: number;
  y: number;
}

export interface Snake {
  positions: Position[];
  direction: Direction;
}

export interface GameState {
  playerSnake: Snake;
  aiSnake: Snake;
  food: Position;
  gridSize: number;
  score: {
    player: number;
    ai: number;
  };
  gameStatus: 'playing' | 'paused' | 'gameOver' | 'waiting';
  winner?: 'player' | 'ai' | 'tie';
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Algorithm = 
  | 'random'
  | 'greedy' 
  | 'bfs'
  | 'dfs'
  | 'dijkstra'
  | 'astar';

export interface AlgorithmInfo {
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  color: string;
}

export interface GameConfig {
  gridSize: number;
  gameSpeed: number;
  algorithm: Algorithm;
}

export interface ApiResponse {
  direction: Direction;
  success: boolean;
  error?: string;
}
