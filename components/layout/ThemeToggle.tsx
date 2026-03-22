'use client';

import { useTheme } from '@/lib/theme';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-black transition-colors rounded-lg hover:bg-white/4 dark:hover:bg-white/4 light:hover:bg-black/5"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}

