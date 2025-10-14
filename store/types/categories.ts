import { ICategory } from '@/types/categories';

export interface ICategoriesState {
  categories: ICategory[];
  isLoading: boolean;
  error: string | null;
}

