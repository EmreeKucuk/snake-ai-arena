from algorithms import PathfindingAlgorithms
from models import Position

# Test border checking
grid_size = 20
obstacles = set()

# Test positions at borders
test_positions = [
    Position(x=-1, y=10),  # Left border
    Position(x=20, y=10),  # Right border  
    Position(x=10, y=-1),  # Top border
    Position(x=10, y=20),  # Bottom border
    Position(x=0, y=0),    # Valid corner
    Position(x=19, y=19),  # Valid corner
]

print("Testing border validation:")
for pos in test_positions:
    is_valid = PathfindingAlgorithms.is_valid_position(pos, grid_size, obstacles)
    print(f'Position ({pos.x}, {pos.y}) is valid: {is_valid}')

# Test safe directions from a corner
print("\nTesting safe directions from corner (0,0):")
head = Position(x=0, y=0)
safe_dirs = PathfindingAlgorithms.get_safe_directions(head, grid_size, obstacles)
print(f"Safe directions from (0,0): {safe_dirs}")

print("\nTesting safe directions from edge (19,10):")
head = Position(x=19, y=10)
safe_dirs = PathfindingAlgorithms.get_safe_directions(head, grid_size, obstacles)
print(f"Safe directions from (19,10): {safe_dirs}")
