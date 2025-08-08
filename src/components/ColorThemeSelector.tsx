import { ColorTheme } from '../types';
import { getThemeColors } from '../utils/themes';

interface ColorThemeSelectorProps {
  selectedTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  disabled?: boolean;
}

const THEME_OPTIONS: Array<{
  theme: ColorTheme;
  name: string;
  description: string;
}> = [
  { theme: 'classic', name: 'Classic', description: 'Traditional green & red' },
  { theme: 'neon', name: 'Neon', description: 'Cyberpunk vibes' },
  { theme: 'ocean', name: 'Ocean', description: 'Blue depths' },
  { theme: 'forest', name: 'Forest', description: 'Nature inspired' },
  { theme: 'sunset', name: 'Sunset', description: 'Warm gradients' }
];

export const ColorThemeSelector = ({
  selectedTheme,
  onThemeChange,
  disabled = false,
}: ColorThemeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-3">Color Theme</h3>
      <div className="grid grid-cols-1 gap-2">
        {THEME_OPTIONS.map(({ theme, name, description }) => {
          const colors = getThemeColors(theme);
          return (
            <button
              key={theme}
              onClick={() => onThemeChange(theme)}
              disabled={disabled}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-left
                ${selectedTheme === theme
                  ? 'border-blue-400 bg-blue-900/50'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-700'}
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1">
                  <div className={`w-3 h-3 rounded ${colors.playerSnake.head}`} />
                  <div className={`w-3 h-3 rounded ${colors.aiSnake.head}`} />
                  <div className={`w-3 h-3 rounded ${colors.food}`} />
                </div>
                <span className="font-semibold text-white">{name}</span>
              </div>
              <div className="text-sm text-gray-400">{description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
