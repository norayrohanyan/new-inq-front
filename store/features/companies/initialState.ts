import { ICompaniesState } from '@/store/types/companies';

export const getInitialState = (): ICompaniesState => ({
  companies: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalCompanies: 0,
  filters: {},
});
