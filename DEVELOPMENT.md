# Snake AI Arena - Development Guide

## 🎮 Project Overview

Snake AI Arena is an interactive web application where users compete against AI-powered snakes using different pathfinding algorithms. The project showcases modern web development with React/TypeScript frontend and Python FastAPI backend.

## 🏗️ Architecture

```
Frontend (React + TypeScript + Tailwind)
    ↕ HTTP API
Backend (Python + FastAPI)
    ↕ Algorithm Modules
AI Pathfinding Algorithms
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.10+ (Note: We use Python 3.10 specifically)
- Git

### Installation & Setup

1. **Install dependencies automatically:**
   ```bash
   # Run the setup script (Windows)
   setup.bat
   ```

2. **Or install manually:**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies (use Python 3.10)
   cd backend
   py -3.10 -m pip install -r requirements.txt
   ```

### Running the Application

**Option 1: Use convenience scripts**
```bash
# Start backend (terminal 1)
start-backend.bat

# Start frontend (terminal 2)
start-frontend.bat
```

**Option 2: Manual start**
```bash
# Backend
cd backend
py -3.10 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Frontend
npm run dev
```

**Option 3: VS Code Tasks**
- Open VS Code in the project folder
- Press `Ctrl+Shift+P` → `Tasks: Run Task`
- Select "Start Full Application" to start both servers

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎯 Game Features

### Controls
- **Arrow Keys** or **WASD**: Move snake
- **Spacebar**: Pause/Resume game
- **Reset Button**: Restart game

### AI Algorithms
1. **Random** (Easy) - Random movement
2. **Greedy** (Easy) - Direct path to food
3. **BFS** (Medium) - Breadth-first search pathfinding
4. **DFS** (Medium) - Depth-first search exploration
5. **Dijkstra** (Hard) - Optimal weighted pathfinding
6. **A*** (Expert) - Heuristic-based optimal search

## 🛠️ Development

### Project Structure
```
snake-ai-arena/
├── src/                           # React frontend source
│   ├── components/                # React components
│   │   ├── GameBoard.tsx          # Game grid visualization
│   │   ├── AlgorithmSelector.tsx  # AI algorithm picker
│   │   ├── GameStats.tsx          # Score and status display
│   │   └── GameControls.tsx       # Game control buttons
│   ├── hooks/                     # Custom React hooks
│   │   └── useGameLogic.ts        # Main game state management
│   ├── services/                  # API communication
│   │   └── api.ts                 # Backend API service
│   ├── types/                     # TypeScript type definitions
│   │   └── game.ts                # Game state types
│   ├── utils/                     # Utility functions
│   │   └── gameLogic.ts           # Core game mechanics
│   ├── App.tsx                    # Main application component
│   └── main.tsx                   # React entry point
├── backend/                       # Python FastAPI backend
│   ├── main.py                    # FastAPI application
│   ├── models.py                  # Pydantic data models
│   ├── algorithms.py              # AI pathfinding implementations
│   └── requirements.txt           # Python dependencies
├── .vscode/tasks.json             # VS Code development tasks
├── package.json                   # Node.js dependencies
└── README.md                      # This file
```

### Key Technologies

**Frontend:**
- React 18 with hooks
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for fast development
- Axios for API calls

**Backend:**
- FastAPI for API framework
- Pydantic for data validation
- Uvicorn ASGI server
- CORS middleware for cross-origin requests

### API Endpoints

```
GET  /api/health              # Health check
POST /api/ai-move             # Get AI snake next move
GET  /api/algorithms          # List available algorithms
GET  /docs                    # Swagger API documentation
```

### Game State Flow

1. **Initialize**: Create initial game state with player and AI snakes
2. **Game Loop**: 
   - Process player input
   - Request AI move from backend
   - Update snake positions
   - Check collisions and food consumption
   - Update scores and game status
3. **Render**: Update UI with new game state

### Adding New AI Algorithms

1. **Implement algorithm** in `backend/algorithms.py`:
   ```python
   @staticmethod
   def my_new_algorithm(game_state: GameStateInput) -> Direction:
       # Your algorithm logic here
       return "UP"  # or "DOWN", "LEFT", "RIGHT"
   ```

2. **Register algorithm** in `backend/main.py`:
   ```python
   ALGORITHM_MAP = {
       # ... existing algorithms
       "my_algorithm": PathfindingAlgorithms.my_new_algorithm,
   }
   ```

3. **Update frontend types** in `src/types/game.ts`:
   ```typescript
   export type Algorithm = 
     | 'random' | 'greedy' | 'bfs' | 'dfs' | 'dijkstra' | 'astar'
     | 'my_algorithm';  // Add your algorithm
   ```

4. **Add UI info** in `src/components/AlgorithmSelector.tsx`:
   ```typescript
   const ALGORITHM_INFO: Record<Algorithm, AlgorithmInfo> = {
     // ... existing algorithms
     my_algorithm: {
       name: 'My Algorithm',
       description: 'Description of what it does',
       difficulty: 'Medium',
       color: 'bg-purple-500',
     },
   };
   ```

## 🧪 Testing

### Manual Testing
1. Start both servers
2. Open browser to http://localhost:3000
3. Test different algorithms
4. Verify game mechanics (movement, collision, scoring)

### API Testing
```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Test AI move endpoint
curl -X POST http://localhost:8000/api/ai-move \
  -H "Content-Type: application/json" \
  -d '{
    "game_state": {
      "ai_snake": [{"x": 10, "y": 10}],
      "player_snake": [{"x": 5, "y": 5}],
      "food": {"x": 15, "y": 15},
      "grid_size": 20
    },
    "algorithm": "greedy"
  }'
```

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Ensure Python 3.10 is installed: `py -3.10 --version`
- Install dependencies: `py -3.10 -m pip install -r requirements.txt`

**Frontend compilation errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors in VS Code

**API connection failed:**
- Verify backend is running on port 8000
- Check CORS configuration in backend
- Ensure frontend proxy is configured correctly

**Game lag or poor performance:**
- Adjust game speed in frontend
- Check browser developer tools for errors
- Verify API response times

### Development Tips

1. **Use VS Code tasks** for easier development workflow
2. **Monitor API logs** in backend terminal for debugging
3. **Use browser dev tools** to debug frontend issues
4. **Test algorithms individually** using the API documentation at `/docs`

## 🔮 Future Enhancements

- [ ] **Machine Learning**: Add Q-Learning and Genetic Algorithms
- [ ] **Multiplayer**: Real-time multiplayer snake battles
- [ ] **Tournament Mode**: AI vs AI competitions
- [ ] **Custom Maps**: User-defined obstacles and layouts
- [ ] **Analytics**: Performance metrics for different algorithms
- [ ] **Replay System**: Save and replay games
- [ ] **Mobile Support**: Touch controls for mobile devices

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
