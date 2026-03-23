'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from '@/providers/theme';
import { Moon, Sun } from 'lucide-react';

function subscribe() {
  return () => {};
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-muted hover:text-foreground transition-colors rounded-lg hover:bg-foreground/5"
      aria-label="Toggle theme"
    >
      {mounted ? (
        theme === 'dark' ? (
          <Moon size={16} />
        ) : (
          <Sun size={16} />
        )
      ) : (
        <span className="block size-4" aria-hidden="true" />
      )}
    </button>
  );
}
