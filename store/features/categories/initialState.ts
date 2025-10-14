import { ICategoriesState } from '@/store/types/categories';

export const getInitialState = (): ICategoriesState => ({
  categories: [],
  isLoading: false,
  error: null,
});

