import { useState, useEffect } from 'react';

export type Theme = 'retro' | 'cupcake' | 'valentine' | 'garden';

const THEMES: Theme[] = ['retro', 'cupcake', 'valentine', 'garden'];
const DEFAULT_THEME: Theme = 'garden';
const THEME_STORAGE_KEY = 'shishu-shakti-theme';

/**
 * Hook to manage theme selection
 * Persists theme choice in localStorage and updates the HTML data-theme attribute
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or use default
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (stored && THEMES.includes(stored)) {
        return stored;
      }
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    // Update HTML data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    // Persist to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return { theme, changeTheme, themes: THEMES };
};

