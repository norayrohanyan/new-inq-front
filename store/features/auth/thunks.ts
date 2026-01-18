import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { 
  ILoginRequest, 
  IRegisterRequest, 
  IResetTokens,
  IEditProfileRequest,
  IUpdatePhoneRequest,
  IUpdatePasswordRequest
} from '@/types/auth';
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

/**
 * Get current authenticated user information
 * Returns user's id, first_name, last_name, and phone
 */
export const getCurrentUserThunk = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiService.getCurrentUser();

      if (response.success && response.data) {
        dispatch(authActions.setUser(response.data));
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch user information');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch user information';
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

/**
 * Edit user profile (first name and last name)
 */
export const editUserProfileThunk = createAsyncThunk(
  'auth/editUserProfile',
  async (profileData: IEditProfileRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await apiService.editProfile(profileData);
      
      if (response.success && response.data) {
        // Update user in state with new first_name and last_name
        dispatch(authActions.setUser({
          ...(await dispatch(getCurrentUserThunk()).unwrap())
        }));
        dispatch(authActions.setLoading(false));
        return response.data;
      } else {
        dispatch(authActions.setError(response.error || 'Failed to update profile'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      dispatch(authActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Update user phone number
 */
export const updateUserPhoneThunk = createAsyncThunk(
  'auth/updateUserPhone',
  async (phoneData: IUpdatePhoneRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await apiService.updatePhone(phoneData.phone);
      
      if (response.success) {
        // Refresh user data to get updated phone
        await dispatch(getCurrentUserThunk());
        dispatch(authActions.setLoading(false));
        return response.data;
      } else {
        dispatch(authActions.setError(response.error || 'Failed to update phone'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update phone';
      dispatch(authActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Update user password (requires current password)
 */
export const updateUserPasswordThunk = createAsyncThunk(
  'auth/updateUserPassword',
  async (passwordData: IUpdatePasswordRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await apiService.updateUserPassword(passwordData);
      
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

