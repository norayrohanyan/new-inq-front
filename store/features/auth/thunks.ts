import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { ILoginRequest, IRegisterRequest, IResetTokens } from '@/types/auth';
import { authActions } from './slice';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await apiService.login(credentials);

      if (response.success && response.data) {
        dispatch(
          authActions.setTokens({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            accessTokenExpiresAt: response.data.access_token_expires_at,
            refreshTokenExpiresAt: response.data.refresh_token_expires_at,
          })
        );
        return response.data;
      } else {
        dispatch(authActions.setError(response.error || 'Login failed'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(authActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: IRegisterRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await apiService.register(data);

      if (response.success) {
        dispatch(authActions.setLoading(false));
        return response.data;
      } else {
        dispatch(authActions.setError(response.error || 'Registration failed'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(authActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const refreshTokensThunk = createAsyncThunk(
  'auth/refreshTokens',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        dispatch(authActions.logout());
        return rejectWithValue('No refresh token available');
      }

      const response = await apiService.refreshTokens(refreshToken);

      if (response.success && response.data) {
        dispatch(
          authActions.setTokens({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            accessTokenExpiresAt: response.data.access_token_expires_at,
            refreshTokenExpiresAt: response.data.refresh_token_expires_at,
          })
        );
        return response.data;
      } else {
        dispatch(authActions.logout());
        return rejectWithValue(response.error);
      }
    } catch (error) {
      dispatch(authActions.logout());
      const errorMessage = error instanceof Error ? error.message : 'Token refresh failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyLinkThunk = createAsyncThunk(
  'auth/verifyLink',
  async (hash: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await apiService.verifyLink(hash);

      if (response.success && response.data) {
        const tokens = response.data.tokens;

        // Check if it's login tokens (has refresh_token) or reset token
        if ('refresh_token' in tokens) {
          // Full authentication tokens (registration verification)
          dispatch(
            authActions.setTokens({
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
              accessTokenExpiresAt: tokens.access_token_expires_at,
              refreshTokenExpiresAt: tokens.refresh_token_expires_at,
            })
          );
        } else {
          // Password reset token - store access token temporarily for password update
          const resetTokens = tokens as IResetTokens;
          dispatch(
            authActions.setTokens({
              accessToken: resetTokens.token,
              refreshToken: '', // No refresh token for password reset
              accessTokenExpiresAt: resetTokens.token_expires_at,
              refreshTokenExpiresAt: '', // No refresh token expiry
            })
          );
        }

        return response.data;
      } else {
        dispatch(authActions.setError(response.error || 'Link verification failed'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Link verification failed';
      dispatch(authActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserProfileThunk = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        return rejectWithValue('No access token available');
      }

      const response = await apiService.getUserProfile(accessToken);

      if (response.success && response.data) {
        dispatch(authActions.setUser(response.data));
        return response.data;
      } else {
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch user profile';
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Send password recovery link
 */
export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async ({ phone, url }: { phone: string; url: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await apiService.forgotPassword(phone, url);
      
      if (response.success) {
        dispatch(authActions.setLoading(false));
        return response.data;
      } else {
        dispatch(authActions.setError(response.error || 'Failed to send recovery link'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send recovery link';
      dispatch(authActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Update password (used after verification link)
 */
export const updatePasswordThunk = createAsyncThunk(
  'auth/updatePassword',
  async (password: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await apiService.updatePassword(password);
      
      if (response.success) {
        dispatch(authActions.setLoading(false));
        return response.data;
      } else {
        dispatch(authActions.setError(response.error || 'Failed to update password'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update password';
      dispatch(authActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

