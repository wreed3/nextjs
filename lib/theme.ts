import { useEffect, useState } from 'react';
import type { Theme } from '@/types';

const THEME_KEY = 'theme';

/**
 * Get the initial theme from localStorage or system preference
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
  if (savedTheme) return savedTheme;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/**
 * Hook to manage theme state
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, mounted };
}