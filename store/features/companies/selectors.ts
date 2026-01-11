import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selectCompaniesState = (state: RootState) => state.companies;

const companies = createSelector(selectCompaniesState, (state) => state.companies);

const isLoading = createSelector(selectCompaniesState, (state) => state.isLoading);

const error = createSelector(selectCompaniesState, (state) => state.error);

const currentPage = createSelector(selectCompaniesState, (state) => state.currentPage);

const totalPages = createSelector(selectCompaniesState, (state) => state.totalPages);

const totalCompanies = createSelector(selectCompaniesState, (state) => state.totalCompanies);

const filters = createSelector(selectCompaniesState, (state) => state.filters);

// Companies by service selectors
const companiesByService = createSelector(selectCompaniesState, (state) => state.companiesByService);

const isLoadingCompaniesByService = createSelector(selectCompaniesState, (state) => state.isLoadingCompaniesByService);

const companiesByServiceError = createSelector(selectCompaniesState, (state) => state.companiesByServiceError);

export default {
  companies,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalCompanies,
  filters,
  companiesByService,
  isLoadingCompaniesByService,
  companiesByServiceError,
};
