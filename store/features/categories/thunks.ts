import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { categoriesActions } from './slice';

export const getCategoriesThunk = createAsyncThunk(
  'categories/getCategories',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(categoriesActions.setLoading(true));
      const response = await apiService.getCategories();

      if (response.success && response.data) {
        dispatch(categoriesActions.setCategories(response.data));
        return response.data;
      } else {
        dispatch(categoriesActions.setError(response.error || 'Failed to fetch categories'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch categories';
      dispatch(categoriesActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

