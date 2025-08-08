from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from models import AIRequest, AIResponse, Direction
from algorithms import PathfindingAlgorithms

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Snake AI Arena Backend",
    description="AI algorithms for Snake game pathfinding",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Algorithm mapping
ALGORITHM_MAP = {
    "random": PathfindingAlgorithms.random_move,
    "greedy": PathfindingAlgorithms.greedy_move,
    "bfs": PathfindingAlgorithms.bfs_move,
    "dfs": PathfindingAlgorithms.dfs_move,
    "dijkstra": PathfindingAlgorithms.dijkstra_move,
    "astar": PathfindingAlgorithms.astar_move,
}

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Snake AI Arena Backend", "status": "running"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "message": "AI Backend is running"}

@app.post("/api/ai-move", response_model=AIResponse)
async def get_ai_move(request: AIRequest):
    """
    Get the next move for the AI snake based on the selected algorithm.
    """
    try:
        logger.info(f"Processing AI move request with algorithm: {request.algorithm}")
        
        # Validate algorithm
        if request.algorithm not in ALGORITHM_MAP:
            raise HTTPException(
                status_code=400, 
                detail=f"Unknown algorithm: {request.algorithm}"
            )
        
        # Get the algorithm function
        algorithm_func = ALGORITHM_MAP[request.algorithm]
        
        # Calculate the next move
        direction = algorithm_func(request.game_state)
        
        logger.info(f"AI move calculated: {direction}")
        
        return AIResponse(
            direction=direction,
            success=True
        )
        
    except Exception as e:
        logger.error(f"Error processing AI move: {str(e)}")
        return AIResponse(
            direction="UP",  # Fallback direction
            success=False,
            error=str(e)
        )

@app.get("/api/algorithms")
async def get_available_algorithms():
    """Get list of available AI algorithms."""
    return {
        "algorithms": [
            {
                "id": "random",
                "name": "Random Movement",
                "description": "Moves randomly without any strategy",
                "difficulty": "Easy"
            },
            {
                "id": "greedy",
                "name": "Greedy",
                "description": "Always moves towards the food",
                "difficulty": "Easy"
            },
            {
                "id": "bfs",
                "name": "Breadth-First Search",
                "description": "Finds the shortest path using BFS",
                "difficulty": "Medium"
            },
            {
                "id": "dfs",
                "name": "Depth-First Search",
                "description": "Explores paths using DFS",
                "difficulty": "Medium"
            },
            {
                "id": "dijkstra",
                "name": "Dijkstra",
                "description": "Optimal pathfinding with weighted edges",
                "difficulty": "Hard"
            },
            {
                "id": "astar",
                "name": "A* Search",
                "description": "Heuristic-based optimal pathfinding",
                "difficulty": "Expert"
            }
        ]
    }

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler."""
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "message": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
