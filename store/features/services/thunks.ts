import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { IService } from '@/store/types/services';
import { servicesActions } from './slice';

interface IFetchServicesPayload {
  category: string;
  page?: number;
  per_page?: number;
  search?: string;
  sort?: string;
  filters?: Record<string, any>;
}

export const getServicesThunk = createAsyncThunk(
  'services/getServices',
  async (payload: IFetchServicesPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(servicesActions.setLoading(true));
      dispatch(servicesActions.setError(null));

      const response = await apiService.getServices(payload);
      if (response.success && response.data) {
        dispatch(servicesActions.setServices(response.data.data));
        dispatch(servicesActions.setCurrentPage(response.data.current_page));
        // Use last_page from API instead of calculating from total
        dispatch(servicesActions.setTotalPages(response.data.last_page || 1));
        dispatch(servicesActions.setTotalServices(response.data.total));
        return response.data.data;
      } else {
        dispatch(servicesActions.setError(response.error || 'Failed to fetch services'));
        return rejectWithValue(response.error || 'Failed to fetch services');
      }
    } catch (error: any) {
      dispatch(servicesActions.setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(servicesActions.setLoading(false));
    }
  }
);
