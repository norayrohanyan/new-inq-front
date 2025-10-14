import { IAppState } from '@/store/types/app';

export const getInitialState = (): IAppState => ({
  isLoading: false,
  isSidebarOpen: true,
  theme: 'light',
  error: null,
});

