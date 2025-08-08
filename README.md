# Snake AI Arena

An interactive web application where users can play the classic Snake game while competing against AI bots powered by different pathfinding algorithms.

## Features

- **Interactive Snake Game**: Classic snake gameplay with smooth controls
- **AI Competition**: Play against AI bots using various algorithms
- **Multiple AI Algorithms**:
  - Random Movement (Easy)
  - Greedy Algorithm (Easy)
  - Breadth-First Search (Medium)
  - Depth-First Search (Medium)
  - Dijkstra's Algorithm (Hard)
  - A* Search (Expert)
- **Real-time Gameplay**: Both player and AI snakes move simultaneously
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Score Tracking**: Compare your performance against different AI difficulties

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

### Backend
- **Python 3.8+** - Runtime
- **FastAPI** - Web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/snake-ai-arena.git
   cd snake-ai-arena
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   python main.py
   ```
   The API will be available at `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## Game Controls

- **Movement**: Arrow keys or WASD
- **Pause/Resume**: Spacebar
- **Reset Game**: Reset button

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/ai-move` - Get next AI move
- `GET /api/algorithms` - List available algorithms

## Algorithm Details

### Random Movement
Simple random direction selection. Easy to beat but unpredictable.

### Greedy Algorithm
Always moves towards the food in the shortest direct path. Doesn't consider obstacles.

### Breadth-First Search (BFS)
Finds the shortest path to food considering all obstacles. Guaranteed optimal path.

### Depth-First Search (DFS)
Explores possible paths deeply before backtracking. May not find optimal path.

### Dijkstra's Algorithm
Optimal pathfinding algorithm that considers edge weights. Finds shortest path.

### A* Search
Heuristic-based pathfinding using Manhattan distance. Efficient and optimal.

## Development

### Project Structure
```
snake-ai-arena/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── backend/               # Backend source
│   ├── main.py           # FastAPI application
│   ├── models.py         # Pydantic models
│   ├── algorithms.py     # AI algorithms
│   └── requirements.txt  # Python dependencies
└── package.json          # Frontend dependencies
```

### Adding New Algorithms

1. Implement the algorithm in `backend/algorithms.py`
2. Add it to the `ALGORITHM_MAP` in `backend/main.py`
3. Update the algorithm selector in the frontend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Genetic Algorithm implementation
- [ ] Q-Learning (Reinforcement Learning)
- [ ] Multiplayer support
- [ ] Tournament mode
- [ ] Algorithm performance analytics
- [ ] Custom maze layouts
- [ ] AI vs AI mode