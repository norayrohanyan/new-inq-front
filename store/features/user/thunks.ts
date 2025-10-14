import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { userActions } from './slice';

export const getActiveTicketsThunk = createAsyncThunk(
  'user/getActiveTickets',
  async (params: { category?: string; page?: number } = {}, { dispatch, rejectWithValue }) => {
    try {
      dispatch(userActions.setLoading(true));
      const response = await apiService.getBookingHistory({
        active: true,
        ...params,
      });
      
      if (response.success && response.data) {
        dispatch(userActions.setActiveTickets(response.data.data));
        return response.data.data;
      } else {
        dispatch(userActions.setError(response.error || 'Failed to fetch active tickets'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch active tickets';
      dispatch(userActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getHistoryTicketsThunk = createAsyncThunk(
  'user/getHistoryTickets',
  async (params: { category?: string; page?: number } = {}, { dispatch, rejectWithValue }) => {
    try {
      dispatch(userActions.setLoading(true));
      const response = await apiService.getBookingHistory({
        active: false,
        ...params,
      });
      
      if (response.success && response.data) {
        dispatch(userActions.setHistoryTickets(response.data.data));
        return response.data.data;
      } else {
        dispatch(userActions.setError(response.error || 'Failed to fetch history tickets'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch history tickets';
      dispatch(userActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getFavoritesThunk = createAsyncThunk(
  'user/getFavorites',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(userActions.setLoading(true));
      const response = await apiService.getFavorites();
      
      if (response.success && response.data) {
        dispatch(userActions.setFavorites(response.data));
        return response.data;
      } else {
        dispatch(userActions.setError(response.error || 'Failed to fetch favorites'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch favorites';
      dispatch(userActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const addFavoriteThunk = createAsyncThunk(
  'user/addFavorite',
  async ({ clientId, category }: { clientId: number; category: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiService.addFavorite(clientId, category);
      
      if (response.success) {
        // Refetch favorites after adding
        dispatch(getFavoritesThunk());
        return { clientId, category };
      } else {
        dispatch(userActions.setError(response.error || 'Failed to add favorite'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add favorite';
      dispatch(userActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteFavoriteThunk = createAsyncThunk(
  'user/deleteFavorite',
  async ({ clientId, category }: { clientId: number; category: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiService.deleteFavorite(clientId, category);
      
      if (response.success) {
        dispatch(userActions.removeFavorite(clientId));
        return clientId;
      } else {
        dispatch(userActions.setError(response.error || 'Failed to delete favorite'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete favorite';
      dispatch(userActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

