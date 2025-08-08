import axios from 'axios';
import { GameState, Direction, Algorithm, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiService {
  static async getAIMove(
    gameState: GameState,
    algorithm: Algorithm
  ): Promise<Direction> {
    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/ai-move`, {
        game_state: {
          ai_snake: gameState.aiSnake.positions,
          player_snake: gameState.playerSnake.positions,
          food: gameState.food,
          grid_size: gameState.gridSize,
        },
        algorithm,
      });

      if (response.data.success) {
        return response.data.direction;
      } else {
        console.error('AI API error:', response.data.error);
        return 'UP'; // fallback direction
      }
    } catch (error) {
      console.error('Failed to get AI move:', error);
      return 'UP'; // fallback direction
    }
  }

  static async checkHealthStatus(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
