import { IAuthState } from '@/store/types/auth';

export const getInitialState = (): IAuthState => {
  return {
    user: null,
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresAt: null,
    refreshTokenExpiresAt: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
};

