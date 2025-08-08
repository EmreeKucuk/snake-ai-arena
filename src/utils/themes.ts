import { ColorTheme } from '../types';

export interface ThemeColors {
  playerSnake: {
    head: string;
    body: string;
  };
  aiSnake: {
    head: string;
    body: string;
  };
  food: string;
  background: string;
  grid: string;
  ui: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const COLOR_THEMES: Record<ColorTheme, ThemeColors> = {
  classic: {
    playerSnake: {
      head: 'bg-green-400',
      body: 'bg-green-600'
    },
    aiSnake: {
      head: 'bg-red-400',
      body: 'bg-red-600'
    },
    food: 'bg-yellow-400',
    background: 'bg-gray-800',
    grid: 'border-gray-700',
    ui: {
      primary: 'bg-blue-600',
      secondary: 'bg-gray-600',
      accent: 'text-blue-400'
    }
  },
  neon: {
    playerSnake: {
      head: 'bg-cyan-400',
      body: 'bg-cyan-600'
    },
    aiSnake: {
      head: 'bg-pink-400',
      body: 'bg-pink-600'
    },
    food: 'bg-yellow-300',
    background: 'bg-black',
    grid: 'border-purple-900',
    ui: {
      primary: 'bg-purple-600',
      secondary: 'bg-gray-800',
      accent: 'text-cyan-400'
    }
  },
  ocean: {
    playerSnake: {
      head: 'bg-blue-400',
      body: 'bg-blue-600'
    },
    aiSnake: {
      head: 'bg-orange-400',
      body: 'bg-orange-600'
    },
    food: 'bg-emerald-400',
    background: 'bg-slate-900',
    grid: 'border-blue-900',
    ui: {
      primary: 'bg-blue-600',
      secondary: 'bg-slate-700',
      accent: 'text-blue-300'
    }
  },
  forest: {
    playerSnake: {
      head: 'bg-lime-400',
      body: 'bg-lime-600'
    },
    aiSnake: {
      head: 'bg-amber-400',
      body: 'bg-amber-600'
    },
    food: 'bg-red-400',
    background: 'bg-green-950',
    grid: 'border-green-800',
    ui: {
      primary: 'bg-green-600',
      secondary: 'bg-green-800',
      accent: 'text-lime-400'
    }
  },
  sunset: {
    playerSnake: {
      head: 'bg-orange-400',
      body: 'bg-orange-600'
    },
    aiSnake: {
      head: 'bg-purple-400',
      body: 'bg-purple-600'
    },
    food: 'bg-yellow-300',
    background: 'bg-gradient-to-b from-orange-900 to-purple-900',
    grid: 'border-orange-800',
    ui: {
      primary: 'bg-orange-600',
      secondary: 'bg-purple-700',
      accent: 'text-orange-300'
    }
  }
};

export function getThemeColors(theme: ColorTheme): ThemeColors {
  return COLOR_THEMES[theme];
}
