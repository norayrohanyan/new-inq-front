import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authActions, authSelectors } from '@/store';
import { setAuthCookies, clearAuthCookies, getCookie } from '@/utils/cookies';
import { apiService } from '@/services/api';

/**
 * Custom hook for authentication with cookies as single source of truth
 * @returns Auth state and tokens from Redux
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  const user = useAppSelector(authSelectors.user);
  const tokens = useAppSelector(authSelectors.tokens);
  const isLoading = useAppSelector(authSelectors.isLoading);
  const error = useAppSelector(authSelectors.error);

  // Function to refresh tokens
  const refreshTokens = useCallback(async (refreshToken: string) => {
    try {
      const response = await apiService.refreshTokens(refreshToken);
      if (response.success && response.data) {
        const newTokens = response.data;
        // Update Redux store with new tokens
        dispatch(
          authActions.setTokens({
            accessToken: newTokens.access_token,
            refreshToken: newTokens.refresh_token,
            accessTokenExpiresAt: newTokens.access_token_expires_at,
            refreshTokenExpiresAt: newTokens.refresh_token_expires_at,
          })
        );
        // Update cookies
        setAuthCookies({
          accessToken: newTokens.access_token,
          refreshToken: newTokens.refresh_token,
          accessTokenExpiresAt: newTokens.access_token_expires_at,
          refreshTokenExpiresAt: newTokens.refresh_token_expires_at,
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to refresh tokens:', err);
      return false;
    }
  }, [dispatch]);

  // Hydrate auth state from cookies on mount
  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    const accessTokenExpiresAt = getCookie('accessTokenExpiresAt');
    const refreshTokenExpiresAt = getCookie('refreshTokenExpiresAt');

    // If we have a valid refresh token
    if (refreshToken && refreshTokenExpiresAt && !isTokenExpired(refreshTokenExpiresAt)) {
      // If access token exists and is valid, hydrate directly
      if (accessToken && accessTokenExpiresAt && !isTokenExpired(accessTokenExpiresAt)) {
      dispatch(
        authActions.hydrateAuth({
          accessToken,
          refreshToken,
          accessTokenExpiresAt,
          refreshTokenExpiresAt,
        })
      );
      } else {
        // Access token expired or missing, try to refresh
        refreshTokens(refreshToken);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync Redux tokens to cookies whenever they change
  useEffect(() => {
    if (tokens.accessToken && tokens.refreshToken) {
      setAuthCookies({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        accessTokenExpiresAt: tokens.accessTokenExpiresAt || undefined,
        refreshTokenExpiresAt: tokens.refreshTokenExpiresAt || undefined,
      });
    } else if (!isAuthenticated) {
      // Clear cookies when logged out
      clearAuthCookies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, isAuthenticated]);

  return {
    isAuthenticated,
    user,
    tokens,
    isLoading,
    error,
  };
};

// Helper function to check if token is expired
const isTokenExpired = (expiresAt: string | null): boolean => {
  if (!expiresAt) return true;
  const expirationTime = new Date(expiresAt).getTime();
  const currentTime = new Date().getTime();
  return currentTime >= expirationTime;
};

