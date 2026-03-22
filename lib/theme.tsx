'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
let didInit = false;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('eco-pulse-theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  }
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      const html = document.documentElement;
      if (theme === 'light') {
        html.classList.remove('dark');
      } else {
        html.classList.add('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';

      if (typeof window !== 'undefined') {
        localStorage.setItem('eco-pulse-theme', newTheme);

        const html = document.documentElement;
        if (newTheme === 'light') {
          html.classList.remove('dark');
        } else {
          html.classList.add('dark');
        }
      }

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
