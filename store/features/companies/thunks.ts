import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { ICompany, ICompanyByService } from '@/store/types/companies';
import { companiesActions } from './slice';

interface IFetchCompaniesPayload {
  category: string;
  page?: number;
  per_page?: number;
  search?: string;
  sort?: string;
  filters?: Record<string, any>;
}

interface IFetchCompaniesByServicePayload {
  category: string;
  service_id: number;
  page?: number;
  per_page?: number;
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

export const getCompaniesByServiceThunk = createAsyncThunk(
  'companies/getCompaniesByService',
  async (payload: IFetchCompaniesByServicePayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(companiesActions.setLoadingCompaniesByService(true));
      dispatch(companiesActions.setCompaniesByServiceError(null));

      const response = await apiService.getCompaniesByService(payload);
      
      if (response.success && response.data) {
        let companies: ICompanyByService[] = [];
        
        if (Array.isArray(response.data)) {
          companies = response.data as unknown as ICompanyByService[];
        } else {
          const companiesData = response.data.data;
          if (Array.isArray(companiesData)) {
            companies = companiesData as unknown as ICompanyByService[];
          } else if (companiesData) {
            companies = [companiesData as unknown as ICompanyByService];
          }
        }
        
        dispatch(companiesActions.setCompaniesByService(companies));
        return companies;
      } else {
        dispatch(companiesActions.setCompaniesByServiceError(response.error || 'Failed to fetch companies'));
        return rejectWithValue(response.error || 'Failed to fetch companies');
      }
    } catch (error: any) {
      dispatch(companiesActions.setCompaniesByServiceError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(companiesActions.setLoadingCompaniesByService(false));
    }
  }
);
