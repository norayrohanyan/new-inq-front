import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { appActions, appSelectors } from '@/store';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

/**
 * Custom hook for theme management with localStorage persistence
 * @returns Theme state and setter function
 */
export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(appSelectors.theme);
  
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>('app_theme', 'light');

  // Hydrate theme from localStorage on mount
  useEffect(() => {
    if (storedTheme && storedTheme !== theme) {
      dispatch(appActions.setTheme(storedTheme));
    }
  }, []);

  // Sync Redux theme to localStorage whenever it changes
  useEffect(() => {
    if (theme !== storedTheme) {
      setStoredTheme(theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, storedTheme]);

  const setTheme = (newTheme: Theme) => {
    dispatch(appActions.setTheme(newTheme));
  };

  const toggleTheme = () => {
    dispatch(appActions.toggleTheme());
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

