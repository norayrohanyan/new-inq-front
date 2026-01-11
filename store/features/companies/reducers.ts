import { PayloadAction } from '@reduxjs/toolkit';
import { ICompaniesState, ICompany, ICompanyByService } from '@/store/types/companies';

const reducers = {
  setLoading: (state: ICompaniesState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  setCompanies: (state: ICompaniesState, action: PayloadAction<ICompany[]>) => {
    state.companies = action.payload;
  },
  setCurrentPage: (state: ICompaniesState, action: PayloadAction<number>) => {
    state.currentPage = action.payload;
  },
  setTotalPages: (state: ICompaniesState, action: PayloadAction<number>) => {
    state.totalPages = action.payload;
  },
  setTotalCompanies: (state: ICompaniesState, action: PayloadAction<number>) => {
    state.totalCompanies = action.payload;
  },
  setFilters: (
    state: ICompaniesState,
    action: PayloadAction<Record<string, any>>
  ) => {
    state.filters = action.payload;
  },
  setError: (state: ICompaniesState, action: PayloadAction<string | null>) => {
    state.error = action.payload;
  },
  clearError: (state: ICompaniesState) => {
    state.error = null;
  },
  clearCompaniesData: (state: ICompaniesState) => {
    state.companies = [];
    state.isLoading = false;
    state.error = null;
    state.currentPage = 1;
    state.totalPages = 1;
    state.totalCompanies = 0;
    state.filters = {};
  },
  // Companies by service reducers
  setCompaniesByService: (state: ICompaniesState, action: PayloadAction<ICompanyByService[]>) => {
    state.companiesByService = action.payload;
  },
  setLoadingCompaniesByService: (state: ICompaniesState, action: PayloadAction<boolean>) => {
    state.isLoadingCompaniesByService = action.payload;
  },
  setCompaniesByServiceError: (state: ICompaniesState, action: PayloadAction<string | null>) => {
    state.companiesByServiceError = action.payload;
  },
  clearCompaniesByService: (state: ICompaniesState) => {
    state.companiesByService = [];
    state.isLoadingCompaniesByService = false;
    state.companiesByServiceError = null;
  },
};

export default reducers;
