import { Algorithm, AlgorithmInfo } from '../types';

interface AlgorithmSelectorProps {
  selectedAlgorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
  disabled?: boolean;
}

const ALGORITHM_INFO: Record<Algorithm, AlgorithmInfo> = {
  random: {
    name: 'Random Movement',
    description: 'Moves randomly without any strategy',
    difficulty: 'Easy',
    color: 'bg-green-500',
  },
  greedy: {
    name: 'Greedy',
    description: 'Always moves towards the food',
    difficulty: 'Easy',
    color: 'bg-yellow-500',
  },
  bfs: {
    name: 'Breadth-First Search',
    description: 'Finds the shortest path using BFS',
    difficulty: 'Medium',
    color: 'bg-blue-500',
  },
  dfs: {
    name: 'Depth-First Search',
    description: 'Explores paths using DFS',
    difficulty: 'Medium',
    color: 'bg-purple-500',
  },
  dijkstra: {
    name: 'Dijkstra',
    description: 'Optimal pathfinding with weighted edges',
    difficulty: 'Hard',
    color: 'bg-orange-500',
  },
  astar: {
    name: 'A* Search',
    description: 'Heuristic-based optimal pathfinding',
    difficulty: 'Expert',
    color: 'bg-red-500',
  },
};

export const AlgorithmSelector = ({
  selectedAlgorithm,
  onAlgorithmChange,
  disabled = false,
}: AlgorithmSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-3">Select AI Algorithm</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(ALGORITHM_INFO).map(([algorithm, info]) => (
          <button
            key={algorithm}
            onClick={() => onAlgorithmChange(algorithm as Algorithm)}
            disabled={disabled}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedAlgorithm === algorithm
                ? 'border-blue-400 bg-blue-900/50'
                : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-700'}
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${info.color}`} />
              <h4 className="font-semibold text-white">{info.name}</h4>
              <span className={`
                text-xs px-2 py-1 rounded-full
                ${info.difficulty === 'Easy' ? 'bg-green-600 text-green-100' :
                  info.difficulty === 'Medium' ? 'bg-yellow-600 text-yellow-100' :
                  info.difficulty === 'Hard' ? 'bg-orange-600 text-orange-100' :
                  'bg-red-600 text-red-100'}
              `}>
                {info.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-300">{info.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
