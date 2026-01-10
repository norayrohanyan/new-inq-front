import { RootState } from '@/store/store';

const filtersSelectors = {
  companiesFilters: (state: RootState) => state.filters.companiesFilters,
  servicesFilters: (state: RootState) => state.filters.servicesFilters,
  isLoading: (state: RootState) => state.filters.isLoading,
  error: (state: RootState) => state.filters.error,
};

export default filtersSelectors;



