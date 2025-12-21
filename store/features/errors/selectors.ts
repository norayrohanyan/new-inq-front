import { RootState } from '@/store';

export const errorsSelectors = {
  getErrors: (state: RootState) => state.errors.errors,
};

