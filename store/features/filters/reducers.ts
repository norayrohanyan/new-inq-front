import { PayloadAction } from '@reduxjs/toolkit';
import { reducerCreatorProducer } from '@/store/common';
import { IFiltersState, FilterSection } from '@/store/types/filters';

const reducers = reducerCreatorProducer<IFiltersState>()({
  setLoading: (state, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },

  setCompaniesFilters: (state, action: PayloadAction<Record<string, FilterSection>>) => {
    state.companiesFilters = action.payload;
    state.isLoading = false;
    state.error = null;
  },

  setServicesFilters: (state, action: PayloadAction<Record<string, FilterSection>>) => {
    state.servicesFilters = action.payload;
    state.isLoading = false;
    state.error = null;
  },

  setError: (state, action: PayloadAction<string | null>) => {
    state.error = action.payload;
    state.isLoading = false;
  },

  clearError: (state) => {
    state.error = null;
  },

  clearFilters: (state) => {
    state.companiesFilters = {};
    state.servicesFilters = {};
    state.error = null;
  },
});

export default reducers;


