import { PayloadAction } from '@reduxjs/toolkit';
import { reducerCreatorProducer } from '@/store/common';
import { ICategoriesState } from '@/store/types/categories';
import { ICategory } from '@/types/categories';

const reducers = reducerCreatorProducer<ICategoriesState>()({
  setLoading: (state, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },

  setCategories: (state, action: PayloadAction<ICategory[]>) => {
    state.categories = action.payload;
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
});

export default reducers;

