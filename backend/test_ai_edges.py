from algorithms import PathfindingAlgorithms
from models import Position, GameStateInput

# Test case: AI snake at the right edge trying to go right
print("=== Testing AI at right edge ===")

# AI snake at position (19, 10) in a 20x20 grid - at the right edge
ai_snake = [Position(x=19, y=10), Position(x=18, y=10), Position(x=17, y=10)]
player_snake = [Position(x=5, y=10), Position(x=4, y=10), Position(x=3, y=10)]
food = [Position(x=10, y=5)]
grid_size = 20

game_state = GameStateInput(
    ai_snake=ai_snake,
    player_snake=player_snake,
    food=food,
    grid_size=grid_size
)

# Test what directions are safe for AI at edge
head = ai_snake[0]
obstacles = set()
for pos in ai_snake[:-1]:
    obstacles.add((pos.x, pos.y))
for pos in player_snake:
    obstacles.add((pos.x, pos.y))

print(f"AI head position: ({head.x}, {head.y})")
print(f"Grid size: {grid_size}")

# Test each direction
directions = ["UP", "DOWN", "LEFT", "RIGHT"]
for direction in directions:
    if direction == "UP":
        next_pos = Position(x=head.x, y=head.y - 1)
    elif direction == "DOWN":
        next_pos = Position(x=head.x, y=head.y + 1)
    elif direction == "LEFT":
        next_pos = Position(x=head.x - 1, y=head.y)
    elif direction == "RIGHT":
        next_pos = Position(x=head.x + 1, y=head.y)
    
    is_valid = PathfindingAlgorithms.is_valid_position(next_pos, grid_size, obstacles)
    print(f"Direction {direction}: next_pos=({next_pos.x}, {next_pos.y}), valid={is_valid}")

safe_directions = PathfindingAlgorithms.get_safe_directions(head, grid_size, obstacles)
print(f"Safe directions: {safe_directions}")

# Test greedy algorithm
greedy_move = PathfindingAlgorithms.greedy_move(game_state)
print(f"Greedy algorithm suggests: {greedy_move}")

print("\n=== Testing AI at bottom edge ===")

# AI snake at position (10, 19) in a 20x20 grid - at the bottom edge
ai_snake = [Position(x=10, y=19), Position(x=10, y=18), Position(x=10, y=17)]
game_state = GameStateInput(
    ai_snake=ai_snake,
    player_snake=player_snake,
    food=food,
    grid_size=grid_size
)

head = ai_snake[0]
obstacles = set()
for pos in ai_snake[:-1]:
    obstacles.add((pos.x, pos.y))
for pos in player_snake:
    obstacles.add((pos.x, pos.y))

print(f"AI head position: ({head.x}, {head.y})")
safe_directions = PathfindingAlgorithms.get_safe_directions(head, grid_size, obstacles)
print(f"Safe directions: {safe_directions}")

greedy_move = PathfindingAlgorithms.greedy_move(game_state)
print(f"Greedy algorithm suggests: {greedy_move}")
