import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selectServicesState = (state: RootState) => state.services;

const services = createSelector(selectServicesState, (state) => state.services);

const isLoading = createSelector(selectServicesState, (state) => state.isLoading);

const error = createSelector(selectServicesState, (state) => state.error);

const currentPage = createSelector(selectServicesState, (state) => state.currentPage);

const totalPages = createSelector(selectServicesState, (state) => state.totalPages);

const totalServices = createSelector(selectServicesState, (state) => state.totalServices);

const filters = createSelector(selectServicesState, (state) => state.filters);

export default {
  services,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalServices,
  filters,
};
