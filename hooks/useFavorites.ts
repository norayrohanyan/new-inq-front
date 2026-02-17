import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors } from '@/store';
import { getFavoritesThunk } from '@/store/features/user/thunks';

/**
 * Custom hook to fetch favorites when user is authenticated
 * This ensures favorites are loaded on app initialization and after page refresh
 */
export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  useEffect(() => {
    // Only fetch favorites if user is authenticated
    if (isAuthenticated) {
      dispatch(getFavoritesThunk());
    }
  }, [isAuthenticated, dispatch]);
};
