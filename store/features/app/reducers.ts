import { PayloadAction } from '@reduxjs/toolkit';
import { reducerCreatorProducer } from '@/store/common';
import { IAppState } from '@/store/types/app';

const reducers = reducerCreatorProducer<IAppState>()({
  setIsLoading: (state, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
    state.isSidebarOpen = action.payload;
  },
  toggleSidebar: (state) => {
    state.isSidebarOpen = !state.isSidebarOpen;
  },
  setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
    state.theme = action.payload;
  },
  toggleTheme: (state) => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
  },
  setError: (state, action: PayloadAction<string | null>) => {
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default reducers;

