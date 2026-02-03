import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { userActions } from './slice';
import { IBookingDetail } from '@/types/user';

export const getBookingThunk = createAsyncThunk(
  'user/getBooking',
  async (
    params: { bookingId: number; category: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(userActions.setCurrentBookingLoading(true));
      const response = await apiService.getBooking(params.bookingId, params.category);

      if (response.success && response.data) {
        // The API can return either a single object or an array
        let booking: IBookingDetail;
        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            dispatch(userActions.setError('Booking not found'));
            dispatch(userActions.setCurrentBookingLoading(false));
            return rejectWithValue('Booking not found');
          }
          booking = response.data[0] as IBookingDetail;
        } else {
          // Single object response
          booking = response.data as unknown as IBookingDetail;
        }
        dispatch(userActions.setCurrentBooking(booking));
        return booking;
      } else {
        dispatch(userActions.setError(response.error || 'Booking not found'));
        dispatch(userActions.setCurrentBookingLoading(false));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch booking';
      dispatch(userActions.setError(errorMessage));
      dispatch(userActions.setCurrentBookingLoading(false));
      return rejectWithValue(errorMessage);
    }
  }
);

export const cancelBookingThunk = createAsyncThunk(
  'user/cancelBooking',
  async (
    params: { bookingId: number; category: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await apiService.cancelBooking(params.bookingId, params.category);

      if (response.success) {
        // Clear current booking and refresh active tickets
        dispatch(userActions.clearCurrentBooking());
        dispatch(getActiveTicketsThunk({ page: 1 }));
        return { bookingId: params.bookingId, category: params.category };
      } else {
        dispatch(userActions.setError(response.error || 'Failed to cancel booking'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to cancel booking';
      dispatch(userActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

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
        // Refetch favorites after deleting (consistent with addFavoriteThunk)
        dispatch(getFavoritesThunk());
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

