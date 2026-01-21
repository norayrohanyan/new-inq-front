import { IAdsState } from '@/store/types/ads';

export const getInitialState = (): IAdsState => ({
  ads: {},
  isLoading: {},
  error: {},
});
