'use client';

import { useTheme } from '@/providers/theme';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-muted hover:text-foreground transition-colors rounded-lg hover:bg-foreground/5"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
