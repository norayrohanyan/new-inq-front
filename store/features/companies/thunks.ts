import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { ICompany } from '@/store/types/companies';
import { companiesActions } from './slice';

interface IFetchCompaniesPayload {
  category: string;
  page?: number;
  per_page?: number;
  search?: string;
  sort?: string;
  filters?: Record<string, any>;
}

export const getCompaniesThunk = createAsyncThunk(
  'companies/getCompanies',
  async (payload: IFetchCompaniesPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(companiesActions.setLoading(true));
      dispatch(companiesActions.setError(null));

      const response = await apiService.getCompanies(payload);
      if (response.success && response.data) {
        dispatch(companiesActions.setCompanies(response.data.data));
        dispatch(companiesActions.setCurrentPage(response.data.current_page));
        // Use last_page from API instead of calculating from total
        dispatch(companiesActions.setTotalPages(response.data.last_page || 1));
        dispatch(companiesActions.setTotalCompanies(response.data.total));
        return response.data.data;
      } else {
        dispatch(companiesActions.setError(response.error || 'Failed to fetch companies'));
        return rejectWithValue(response.error || 'Failed to fetch companies');
      }
    } catch (error: any) {
      dispatch(companiesActions.setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(companiesActions.setLoading(false));
    }
  }
);
