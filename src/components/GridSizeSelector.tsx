import { GridSize } from '../types';

interface GridSizeSelectorProps {
  selectedSize: GridSize;
  onSizeChange: (size: GridSize) => void;
  disabled?: boolean;
}

const GRID_OPTIONS = [
  { size: 20 as GridSize, label: '20×20', description: '1 fruit - Classic' },
  { size: 30 as GridSize, label: '30×30', description: '2 fruits - Medium' },
  { size: 40 as GridSize, label: '40×40', description: '3 fruits - Large' }
];

export const GridSizeSelector = ({
  selectedSize,
  onSizeChange,
  disabled = false,
}: GridSizeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-3">Grid Size</h3>
      <div className="space-y-2">
        {GRID_OPTIONS.map(({ size, label, description }) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            disabled={disabled}
            className={`
              w-full p-3 rounded-lg border transition-all duration-200 text-left
              ${selectedSize === size
                ? 'border-blue-400 bg-blue-900/50'
                : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-700'}
            `}
          >
            <div className="font-semibold text-white">{label}</div>
            <div className="text-sm text-gray-400">{description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
