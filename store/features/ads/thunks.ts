import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { adsActions } from './slice';

export const getAdsThunk = createAsyncThunk(
  'ads/getAds',
  async (pageName: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(adsActions.setLoading({ pageName, isLoading: true }));
      dispatch(adsActions.setError({ pageName, error: null }));

      const response = await apiService.getAds(pageName);

      if (response.success && response.data) {
        dispatch(adsActions.setAds({ pageName, ads: response.data }));
        return response.data;
      } else {
        const errorMessage = response.error || 'Failed to fetch ads';
        dispatch(adsActions.setError({ pageName, error: errorMessage }));
        return rejectWithValue(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred while fetching ads';
      dispatch(adsActions.setError({ pageName, error: errorMessage }));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(adsActions.setLoading({ pageName, isLoading: false }));
    }
  }
);
