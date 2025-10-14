import { PayloadAction } from '@reduxjs/toolkit';
import { reducerCreatorProducer } from '@/store/common';
import { IAuthState } from '@/store/types/auth';
import { IUser } from '@/types/auth';

interface ISetTokensPayload {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

const reducers = reducerCreatorProducer<IAuthState>()({
  setLoading: (state, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },

  setError: (state, action: PayloadAction<string | null>) => {
    state.error = action.payload;
    state.isLoading = false;
  },

  setTokens: (state, action: PayloadAction<ISetTokensPayload>) => {
    const { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt } =
      action.payload;

    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    state.accessTokenExpiresAt = accessTokenExpiresAt;
    state.refreshTokenExpiresAt = refreshTokenExpiresAt;
    state.isAuthenticated = true;
    state.isLoading = false;
    state.error = null;
    
    // Note: localStorage sync is handled by useAuth hook
  },

  setUser: (state, action: PayloadAction<IUser>) => {
    state.user = action.payload;
  },

  hydrateAuth: (state, action: PayloadAction<ISetTokensPayload>) => {
    const { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt } =
      action.payload;

    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    state.accessTokenExpiresAt = accessTokenExpiresAt;
    state.refreshTokenExpiresAt = refreshTokenExpiresAt;
    state.isAuthenticated = true;
  },

  logout: (state) => {
    state.user = null;
    state.accessToken = null;
    state.refreshToken = null;
    state.accessTokenExpiresAt = null;
    state.refreshTokenExpiresAt = null;
    state.isAuthenticated = false;
    state.isLoading = false;
    state.error = null;
    
    // Note: localStorage clear is handled by useAuth hook
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default reducers;

