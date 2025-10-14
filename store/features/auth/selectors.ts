import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selector = (state: RootState) => state.auth;

const user = createSelector(selector, (state) => state.user);

const isAuthenticated = createSelector(selector, (state) => state.isAuthenticated);

const isLoading = createSelector(selector, (state) => state.isLoading);

const error = createSelector(selector, (state) => state.error);

const accessToken = createSelector(selector, (state) => state.accessToken);

const refreshToken = createSelector(selector, (state) => state.refreshToken);

const tokens = createSelector(selector, (state) => ({
  accessToken: state.accessToken,
  refreshToken: state.refreshToken,
  accessTokenExpiresAt: state.accessTokenExpiresAt,
  refreshTokenExpiresAt: state.refreshTokenExpiresAt,
}));

export default {
  user,
  isAuthenticated,
  isLoading,
  error,
  accessToken,
  refreshToken,
  tokens,
};

