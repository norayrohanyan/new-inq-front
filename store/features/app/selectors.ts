import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selector = (state: RootState) => state.app;

const isLoading = createSelector(selector, (state) => state.isLoading);

const isSidebarOpen = createSelector(selector, (state) => state.isSidebarOpen);

const theme = createSelector(selector, (state) => state.theme);

const error = createSelector(selector, (state) => state.error);

const hasError = createSelector(selector, (state) => state.error !== null);

export default {
  isLoading,
  isSidebarOpen,
  theme,
  error,
  hasError,
};

