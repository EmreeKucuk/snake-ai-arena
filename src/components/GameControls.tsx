import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface GameControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSettings?: () => void;
  disabled?: boolean;
}

export const GameControls = ({
  isPlaying,
  isPaused,
  onStart,
  onPause,
  onReset,
  onSettings,
  disabled = false,
}: GameControlsProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {!isPlaying || isPaused ? (
        <button
          onClick={onStart}
          disabled={disabled}
          className="btn-primary flex items-center gap-2 min-w-[120px] justify-center"
        >
          <Play size={18} />
          {isPaused ? 'Resume' : 'Start Game'}
        </button>
      ) : (
        <button
          onClick={onPause}
          disabled={disabled}
          className="btn-secondary flex items-center gap-2 min-w-[120px] justify-center"
        >
          <Pause size={18} />
          Pause
        </button>
      )}
      
      <button
        onClick={onReset}
        disabled={disabled}
        className="btn-secondary flex items-center gap-2"
      >
        <RotateCcw size={18} />
        Reset
      </button>
      
      {onSettings && (
        <button
          onClick={onSettings}
          disabled={disabled}
          className="btn-secondary flex items-center gap-2"
        >
          <Settings size={18} />
          Settings
        </button>
      )}
    </div>
  );
};
