import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selector = (state: RootState) => state.categories;

const categories = createSelector(selector, (state) => state.categories);

const isLoading = createSelector(selector, (state) => state.isLoading);

const error = createSelector(selector, (state) => state.error);

const hasCategories = createSelector(
  categories,
  (categories) => categories.length > 0
);

export default {
  categories,
  isLoading,
  error,
  hasCategories,
};

