import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authActions, authSelectors } from '@/store';
import { setAuthCookies, clearAuthCookies, getCookie } from '@/utils/cookies';

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

  // Hydrate auth state from cookies on mount
  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    const accessTokenExpiresAt = getCookie('accessTokenExpiresAt');
    const refreshTokenExpiresAt = getCookie('refreshTokenExpiresAt');

    if (
      accessToken &&
      refreshToken &&
      accessTokenExpiresAt &&
      refreshTokenExpiresAt &&
      !isTokenExpired(accessTokenExpiresAt)
    ) {
      dispatch(
        authActions.hydrateAuth({
          accessToken,
          refreshToken,
          accessTokenExpiresAt,
          refreshTokenExpiresAt,
        })
      );
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

