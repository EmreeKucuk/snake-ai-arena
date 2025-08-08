# Snake AI Arena

An interactive web application where users can play the classic Snake game while competing against AI bots powered by different pathfinding algorithms. Features multiple grid sizes, color themes, and advanced game mechanics.

## 🎮 Features

### Core Gameplay
- **Interactive Snake Game**: Classic snake gameplay with smooth controls
- **AI Competition**: Play against AI bots using various pathfinding algorithms
- **Real-time Gameplay**: Both player and AI snakes move simultaneously
- **Auto-Reset**: Game automatically resets when starting after game over
- **Score Tracking**: Real-time scoreboard with player vs AI statistics
- **Snake Growth**: Both snakes grow with each fruit consumed

### Advanced Features
- **Multiple Grid Sizes**: Choose between 20×20, 30×30, and 40×40 grids
- **Dynamic Fruit System**: 1, 2, or 3 fruits based on grid size
- **Color Themes**: Multiple visual themes for different aesthetics
- **Keyboard Shortcuts**: 
  - Space: Play/Pause toggle
  - R: Reset game
  - Arrow Keys/WASD: Snake movement
- **Border-Safe AI**: All algorithms properly avoid borders and collisions
- **Speed Control**: Adjustable game speed (50ms - 300ms intervals)

### AI Algorithms
- **Random Movement** (Easy) - Unpredictable movement patterns
- **Greedy Algorithm** (Easy) - Always moves towards the closest food
- **Breadth-First Search** (Medium) - Finds shortest path using BFS
- **Depth-First Search** (Medium) - Explores paths using DFS
- **Dijkstra's Algorithm** (Hard) - Optimal pathfinding with weighted edges
- **A* Search** (Expert) - Heuristic-based optimal pathfinding

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication
- **Lucide React** - Beautiful icon library

### Backend
- **Python 3.10+** - Modern Python runtime
- **FastAPI** - High-performance web framework
- **Pydantic** - Data validation and settings management
- **Uvicorn** - Lightning-fast ASGI server
- **CORS Middleware** - Cross-origin resource sharing support

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Python 3.10+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EmreeKucuk/snake-ai-arena.git
   cd snake-ai-arena
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up Python environment and install backend dependencies**
   ```bash
   # Create virtual environment
   python -m venv .venv
   
   # Activate virtual environment
   # Windows:
   .venv\Scripts\activate
   # macOS/Linux:
   source .venv/bin/activate
   
   # Install dependencies
   cd backend
   pip install fastapi uvicorn pydantic
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   python -m uvicorn main:app --reload --port 8000
   ```
   Backend API available at `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   Frontend available at `http://localhost:3001`

## 🎯 Game Controls

### Keyboard Controls
- **Movement**: Arrow keys or WASD keys
- **Play/Pause**: Spacebar
- **Reset Game**: R key

### Mouse Controls
- **Start Game**: Click Start button
- **Pause Game**: Click Pause button
- **Reset Game**: Click Reset button
- **Grid Size**: Select from dropdown (20×20, 30×30, 40×40)
- **Color Theme**: Choose from available themes
- **AI Algorithm**: Select from algorithm dropdown
- **Game Speed**: Adjust with speed slider

## 🧠 Algorithm Details

### Random Movement
- **Difficulty**: Easy
- **Strategy**: Random direction selection with basic collision avoidance
- **Best for**: Learning game mechanics

### Greedy Algorithm
- **Difficulty**: Easy  
- **Strategy**: Always moves towards the closest food
- **Behavior**: Direct pathfinding without complex obstacle consideration

### Breadth-First Search (BFS)
- **Difficulty**: Medium
- **Strategy**: Explores all paths level by level
- **Guarantee**: Finds shortest path to food

### Depth-First Search (DFS)
- **Difficulty**: Medium
- **Strategy**: Explores paths deeply before backtracking
- **Behavior**: May find longer paths but explores thoroughly

### Dijkstra's Algorithm
- **Difficulty**: Hard
- **Strategy**: Optimal pathfinding considering all edge weights
- **Guarantee**: Always finds the shortest path

### A* Search
- **Difficulty**: Expert
- **Strategy**: Heuristic-based pathfinding using Manhattan distance
- **Advantage**: Efficient and optimal with intelligent path planning

## 📡 API Reference

### Health Check
```http
GET /api/health
```
Returns server health status.

### Get AI Move
```http
POST /api/ai-move
Content-Type: application/json

{
  "game_state": {
    "ai_snake": [{"x": 15, "y": 10}, {"x": 14, "y": 10}],
    "player_snake": [{"x": 5, "y": 10}, {"x": 4, "y": 10}],
    "food": [{"x": 10, "y": 5}],
    "grid_size": 20
  },
  "algorithm": "astar"
}
```

### List Algorithms
```http
GET /api/algorithms
```
Returns available AI algorithms with descriptions.

## 🏗 Project Structure

```
snake-ai-arena/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── GameBoard.tsx   # Game grid and rendering
│   │   ├── GameStats.tsx   # Score and status display
│   │   ├── GameControls.tsx # Control buttons
│   │   ├── AlgorithmSelector.tsx # AI algorithm picker
│   │   ├── GridSizeSelector.tsx  # Grid size picker
│   │   └── ColorThemeSelector.tsx # Theme picker
│   ├── hooks/             # Custom React hooks
│   │   └── useGameLogic.ts # Main game logic hook
│   ├── services/          # API communication
│   │   └── api.ts         # Backend API service
│   ├── types/             # TypeScript type definitions
│   │   └── game.ts        # Game-related types
│   ├── utils/             # Utility functions
│   │   ├── gameLogic.ts   # Core game mechanics
│   │   └── themes.ts      # Color theme definitions
│   └── App.tsx            # Main application component
├── backend/               # Backend source code
│   ├── main.py           # FastAPI application
│   ├── models.py         # Pydantic data models
│   ├── algorithms.py     # AI pathfinding algorithms
│   └── requirements.txt  # Python dependencies
├── package.json          # Frontend dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite build configuration
└── README.md             # Project documentation
```

## 🔧 Development

### Adding New AI Algorithms

1. **Implement in backend**:
   ```python
   # In backend/algorithms.py
   @staticmethod
   def your_algorithm_move(game_state: GameStateInput) -> Direction:
       # Your algorithm implementation
       return direction
   ```

2. **Register algorithm**:
   ```python
   # In backend/main.py
   ALGORITHM_MAP = {
       # ... existing algorithms
       "your_algorithm": PathfindingAlgorithms.your_algorithm_move,
   }
   ```

3. **Update frontend types**:
   ```typescript
   // In src/types/game.ts
   export type Algorithm = 'random' | 'greedy' | 'bfs' | 'dfs' | 'dijkstra' | 'astar' | 'your_algorithm';
   ```

### Adding New Color Themes

1. **Define theme colors**:
   ```typescript
   // In src/utils/themes.ts
   export const themes = {
     yourTheme: {
       background: 'bg-your-bg',
       grid: 'border-your-border',
       // ... other colors
     }
   };
   ```

## 🧪 Testing

Run the application and test:
- ✅ All AI algorithms avoid borders
- ✅ Score updates correctly
- ✅ Snakes grow when eating fruit
- ✅ Auto-reset functionality
- ✅ Keyboard shortcuts work
- ✅ Grid size changes properly
- ✅ Multiple fruits appear based on grid size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment

### Option 1: Vercel (Recommended for Full Stack)

**Frontend + Backend deployment with Vercel:**

1. **Prepare for deployment**:
   ```bash
   # Create vercel.json in project root
   ```

2. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Pages + Railway/Render

**Frontend on GitHub Pages + Backend on Railway:**

1. **Deploy Frontend to GitHub Pages**:
   ```bash
   # Install gh-pages
   npm install --save-dev gh-pages
   
   # Add to package.json scripts:
   "homepage": "https://EmreeKucuk.github.io/snake-ai-arena",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   
   # Deploy
   npm run deploy
   ```

2. **Deploy Backend to Railway**:
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repo
   - Select backend folder
   - Add environment variables
   - Deploy automatically

### Option 3: Netlify + Heroku

**Frontend on Netlify + Backend on Heroku:**

1. **Netlify Frontend**:
   - Go to [Netlify](https://netlify.com)
   - Connect GitHub repo
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Heroku Backend**:
   - Create `Procfile` in backend/:
     ```
     web: uvicorn main:app --host 0.0.0.0 --port $PORT
     ```
   - Deploy to Heroku

### Option 4: Complete GitHub Actions CI/CD

**Automated deployment with GitHub Actions:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Snake AI Arena

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway
        uses: railway-app/railway-deploy@v1
        with:
          service: backend
          token: ${{ secrets.RAILWAY_TOKEN }}
```

## 🌐 Environment Configuration

### Frontend Environment Variables

Create `.env` file:
```env
VITE_API_URL=https://your-backend-url.com
VITE_APP_TITLE=Snake AI Arena
```

### Backend Environment Variables

For production deployment:
```env
CORS_ORIGINS=https://your-frontend-url.com
PORT=8000
ENVIRONMENT=production
```

### Update API Base URL

Update `src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

## 🚀 Future Enhancements

### AI Improvements
- [ ] Neural Network-based AI
- [ ] Genetic Algorithm implementation
- [ ] Q-Learning (Reinforcement Learning)
- [ ] Minimax algorithm with game tree search

### Game Features
- [ ] Multiplayer support (real-time)
- [ ] Tournament mode with brackets
- [ ] AI vs AI spectator mode
- [ ] Custom maze layouts and obstacles
- [ ] Power-ups and special items
- [ ] Replay system
- [ ] Statistics and analytics dashboard

### Technical Improvements
- [ ] WebSocket for real-time updates
- [ ] Progressive Web App (PWA) support
- [ ] Mobile responsive design
- [ ] Performance optimizations
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 📊 Performance

- **Frontend**: Optimized React rendering with proper memoization
- **Backend**: FastAPI with async support for high concurrency
- **Real-time**: Game loop optimized for smooth 60fps gameplay
- **Algorithms**: Efficient pathfinding with safety checks and fallbacks

---

**Built with ❤️ using React, TypeScript, FastAPI, and modern web technologies.**