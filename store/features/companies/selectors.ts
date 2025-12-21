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

export default {
  companies,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalCompanies,
  filters,
};
