from pydantic import BaseModel
from typing import List, Literal

# Type aliases
Direction = Literal["UP", "DOWN", "LEFT", "RIGHT"]
Algorithm = Literal["random", "greedy", "bfs", "dfs", "dijkstra", "astar"]

class Position(BaseModel):
    x: int
    y: int

class GameStateInput(BaseModel):
    ai_snake: List[Position]
    player_snake: List[Position]
    food: List[Position]
    grid_size: int

class AIRequest(BaseModel):
    game_state: GameStateInput
    algorithm: Algorithm

class AIResponse(BaseModel):
    direction: Direction
    success: bool
    error: str = None
