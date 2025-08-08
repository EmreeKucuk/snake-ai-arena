import axios from 'axios';
import { GameState, Direction, Algorithm, ApiResponse } from '../types';

// Use your Render backend URL for production
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? '/api'  // Local development
  : 'https://snake-ai-arena.onrender.com/api';  // Production

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
      console.log('Checking health at:', `${API_BASE_URL}/health`);
      const response = await axios.get(`${API_BASE_URL}/health`);
      console.log('Health check response:', response.data);
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}
