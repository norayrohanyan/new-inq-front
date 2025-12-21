import { PayloadAction } from '@reduxjs/toolkit';
import { IServicesState, IService } from '@/store/types/services';

const reducers = {
  setLoading: (state: IServicesState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  setServices: (state: IServicesState, action: PayloadAction<IService[]>) => {
    state.services = action.payload;
  },
  setCurrentPage: (state: IServicesState, action: PayloadAction<number>) => {
    state.currentPage = action.payload;
  },
  setTotalPages: (state: IServicesState, action: PayloadAction<number>) => {
    state.totalPages = action.payload;
  },
  setTotalServices: (state: IServicesState, action: PayloadAction<number>) => {
    state.totalServices = action.payload;
  },
  setFilters: (
    state: IServicesState,
    action: PayloadAction<Record<string, any>>
  ) => {
    state.filters = action.payload;
  },
  setError: (state: IServicesState, action: PayloadAction<string | null>) => {
    state.error = action.payload;
  },
  clearError: (state: IServicesState) => {
    state.error = null;
  },
  clearServicesData: (state: IServicesState) => {
    state.services = [];
    state.isLoading = false;
    state.error = null;
    state.currentPage = 1;
    state.totalPages = 1;
    state.totalServices = 0;
    state.filters = {};
  },
};

export default reducers;
