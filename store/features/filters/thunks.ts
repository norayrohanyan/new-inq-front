import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { filtersActions } from './slice';
import { FilterSection } from '@/store/types/filters';

/**
 * Transform API response to FilterSection format
 */
const transformFiltersResponse = (data: Record<string, any>): Record<string, FilterSection> => {
  const transformedFilters: Record<string, FilterSection> = {};

  Object.entries(data).forEach(([key, value]: [string, any]) => {
    if (value && typeof value === 'object' && value.title) {
      // API returns "values" (plural) not "value"
      const options = value.values || value.value || [];
      
      transformedFilters[key] = {
        title: value.title,
        options: Array.isArray(options)
          ? options
          : typeof options === 'object'
          ? [options]
          : [],
      };
    }
  });

  return transformedFilters;
};

/**
 * Fetch companies filters by category
 * Only extracts the "categories" section and renames it to "subcategory"
 */
export const getCompaniesFiltersThunk = createAsyncThunk(
  'filters/getCompaniesFilters',
  async (category: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(filtersActions.setLoading(true));
      const response = await apiService.getCompaniesFilters(category);

      if (response.success && response.data) {
        const transformedFilters: Record<string, FilterSection> = {};
        
        // Only use "categories" filter for companies
        if (response.data.categories) {
          transformedFilters['subcategory'] = {
            title: 'Subcategory',
            options: response.data.categories.values || response.data.categories.value || [],
          };
        }
        
        dispatch(filtersActions.setCompaniesFilters(transformedFilters));
        return transformedFilters;
      } else {
        dispatch(filtersActions.setError(response.error || 'Failed to fetch filters'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch filters';
      dispatch(filtersActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Fetch services filters by category
 * Only extracts the "services" section and renames it to "subcategory"
 */
export const getServicesFiltersThunk = createAsyncThunk(
  'filters/getServicesFilters',
  async (category: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(filtersActions.setLoading(true));
      const response = await apiService.getServicesFilters(category);

      if (response.success && response.data) {
        const transformedFilters: Record<string, FilterSection> = {};
        
        // Only use "services" filter for services
        if (response.data.services) {
          transformedFilters['subcategory'] = {
            title: 'Subcategory',
            options: response.data.services.values || response.data.services.value || [],
          };
        }
        
        dispatch(filtersActions.setServicesFilters(transformedFilters));
        return transformedFilters;
      } else {
        dispatch(filtersActions.setError(response.error || 'Failed to fetch filters'));
        return rejectWithValue(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch filters';
      dispatch(filtersActions.setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

