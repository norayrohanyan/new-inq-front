import { IFiltersState } from '@/store/types/filters';

export const getInitialState = (): IFiltersState => ({
  companiesFilters: {},
  servicesFilters: {},
  isLoading: false,
  error: null,
});


