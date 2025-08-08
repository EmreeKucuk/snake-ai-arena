import random
from collections import deque
import heapq
from typing import List, Tuple, Set, Optional
from models import Position, Direction, GameStateInput

class PathfindingAlgorithms:
    """Collection of pathfinding algorithms for the Snake AI."""
    
    DIRECTIONS = {
        "UP": (0, -1),
        "DOWN": (0, 1),
        "LEFT": (-1, 0),
        "RIGHT": (1, 0)
    }
    
    @staticmethod
    def is_valid_position(pos: Position, grid_size: int, obstacles: Set[Tuple[int, int]]) -> bool:
        """Check if a position is valid (within grid and not an obstacle)."""
        return (0 <= pos.x < grid_size and 
                0 <= pos.y < grid_size and 
                (pos.x, pos.y) not in obstacles)
    
    @staticmethod
    def get_neighbors(pos: Position) -> List[Tuple[Direction, Position]]:
        """Get all possible neighbor positions with their directions."""
        neighbors = []
        for direction, (dx, dy) in PathfindingAlgorithms.DIRECTIONS.items():
            new_pos = Position(x=pos.x + dx, y=pos.y + dy)
            neighbors.append((direction, new_pos))
        return neighbors
    
    @staticmethod
    def random_move(game_state: GameStateInput) -> Direction:
        """Random movement algorithm."""
        return random.choice(list(PathfindingAlgorithms.DIRECTIONS.keys()))
    
    @staticmethod
    def greedy_move(game_state: GameStateInput) -> Direction:
        """Greedy algorithm - always move towards food."""
        head = game_state.ai_snake[0]
        food = game_state.food
        
        # Calculate direction towards food
        dx = food.x - head.x
        dy = food.y - head.y
        
        # Prioritize the axis with larger difference
        if abs(dx) > abs(dy):
            return "RIGHT" if dx > 0 else "LEFT"
        else:
            return "DOWN" if dy > 0 else "UP"
    
    @staticmethod
    def bfs_move(game_state: GameStateInput) -> Direction:
        """Breadth-First Search pathfinding."""
        head = game_state.ai_snake[0]
        food = game_state.food
        grid_size = game_state.grid_size
        
        # Create obstacles set (all snake positions except AI tail)
        obstacles = set()
        for pos in game_state.ai_snake[:-1]:  # Exclude tail as it will move
            obstacles.add((pos.x, pos.y))
        for pos in game_state.player_snake:
            obstacles.add((pos.x, pos.y))
        
        # BFS
        queue = deque([(head, [])])
        visited = {(head.x, head.y)}
        
        while queue:
            current_pos, path = queue.popleft()
            
            if current_pos.x == food.x and current_pos.y == food.y:
                return path[0] if path else "UP"
            
            for direction, next_pos in PathfindingAlgorithms.get_neighbors(current_pos):
                if (PathfindingAlgorithms.is_valid_position(next_pos, grid_size, obstacles) and
                    (next_pos.x, next_pos.y) not in visited):
                    
                    visited.add((next_pos.x, next_pos.y))
                    new_path = path + [direction]
                    queue.append((next_pos, new_path))
        
        # No path found, use greedy
        return PathfindingAlgorithms.greedy_move(game_state)
    
    @staticmethod
    def dfs_move(game_state: GameStateInput) -> Direction:
        """Depth-First Search pathfinding."""
        head = game_state.ai_snake[0]
        food = game_state.food
        grid_size = game_state.grid_size
        
        # Create obstacles set
        obstacles = set()
        for pos in game_state.ai_snake[:-1]:
            obstacles.add((pos.x, pos.y))
        for pos in game_state.player_snake:
            obstacles.add((pos.x, pos.y))
        
        # DFS
        stack = [(head, [])]
        visited = {(head.x, head.y)}
        
        while stack:
            current_pos, path = stack.pop()
            
            if current_pos.x == food.x and current_pos.y == food.y:
                return path[0] if path else "UP"
            
            for direction, next_pos in PathfindingAlgorithms.get_neighbors(current_pos):
                if (PathfindingAlgorithms.is_valid_position(next_pos, grid_size, obstacles) and
                    (next_pos.x, next_pos.y) not in visited):
                    
                    visited.add((next_pos.x, next_pos.y))
                    new_path = path + [direction]
                    stack.append((next_pos, new_path))
        
        # No path found, use greedy
        return PathfindingAlgorithms.greedy_move(game_state)
    
    @staticmethod
    def dijkstra_move(game_state: GameStateInput) -> Direction:
        """Dijkstra's algorithm pathfinding."""
        head = game_state.ai_snake[0]
        food = game_state.food
        grid_size = game_state.grid_size
        
        # Create obstacles set
        obstacles = set()
        for pos in game_state.ai_snake[:-1]:
            obstacles.add((pos.x, pos.y))
        for pos in game_state.player_snake:
            obstacles.add((pos.x, pos.y))
        
        # Dijkstra's algorithm
        # Priority queue: (distance, position, path)
        pq = [(0, head, [])]
        distances = {(head.x, head.y): 0}
        
        while pq:
            current_dist, current_pos, path = heapq.heappop(pq)
            
            if current_pos.x == food.x and current_pos.y == food.y:
                return path[0] if path else "UP"
            
            # Skip if we've found a shorter path to this position
            if current_dist > distances.get((current_pos.x, current_pos.y), float('inf')):
                continue
            
            for direction, next_pos in PathfindingAlgorithms.get_neighbors(current_pos):
                if PathfindingAlgorithms.is_valid_position(next_pos, grid_size, obstacles):
                    new_dist = current_dist + 1  # All edges have weight 1
                    
                    if new_dist < distances.get((next_pos.x, next_pos.y), float('inf')):
                        distances[(next_pos.x, next_pos.y)] = new_dist
                        new_path = path + [direction]
                        heapq.heappush(pq, (new_dist, next_pos, new_path))
        
        # No path found, use greedy
        return PathfindingAlgorithms.greedy_move(game_state)
    
    @staticmethod
    def manhattan_distance(pos1: Position, pos2: Position) -> int:
        """Calculate Manhattan distance between two positions."""
        return abs(pos1.x - pos2.x) + abs(pos1.y - pos2.y)
    
    @staticmethod
    def astar_move(game_state: GameStateInput) -> Direction:
        """A* pathfinding algorithm."""
        head = game_state.ai_snake[0]
        food = game_state.food
        grid_size = game_state.grid_size
        
        # Create obstacles set
        obstacles = set()
        for pos in game_state.ai_snake[:-1]:
            obstacles.add((pos.x, pos.y))
        for pos in game_state.player_snake:
            obstacles.add((pos.x, pos.y))
        
        # A* algorithm
        # Priority queue: (f_score, g_score, position, path)
        pq = [(PathfindingAlgorithms.manhattan_distance(head, food), 0, head, [])]
        g_scores = {(head.x, head.y): 0}
        
        while pq:
            f_score, g_score, current_pos, path = heapq.heappop(pq)
            
            if current_pos.x == food.x and current_pos.y == food.y:
                return path[0] if path else "UP"
            
            # Skip if we've found a shorter path to this position
            if g_score > g_scores.get((current_pos.x, current_pos.y), float('inf')):
                continue
            
            for direction, next_pos in PathfindingAlgorithms.get_neighbors(current_pos):
                if PathfindingAlgorithms.is_valid_position(next_pos, grid_size, obstacles):
                    tentative_g_score = g_score + 1
                    
                    if tentative_g_score < g_scores.get((next_pos.x, next_pos.y), float('inf')):
                        g_scores[(next_pos.x, next_pos.y)] = tentative_g_score
                        h_score = PathfindingAlgorithms.manhattan_distance(next_pos, food)
                        f_score = tentative_g_score + h_score
                        new_path = path + [direction]
                        heapq.heappush(pq, (f_score, tentative_g_score, next_pos, new_path))
        
        # No path found, use greedy
        return PathfindingAlgorithms.greedy_move(game_state)
