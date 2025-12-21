import { IServicesState } from '@/store/types/services';

export const getInitialState = (): IServicesState => ({
  services: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalServices: 0,
  filters: {},
});
