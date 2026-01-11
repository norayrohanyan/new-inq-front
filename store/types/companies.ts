export interface ICompany {
  id: number;
  name: string;
  address: string;
  rating: string;
  work_hours: string[];
  is_open: boolean;
  image_url: string | null;
}

export interface ICompanyByService {
  id: number;
  name: string;
  logo?: string;
  image_url?: string;
  rating?: number | string;
  is_individual?: boolean;
}

export interface ICompaniesState {
  companies: ICompany[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCompanies: number;
  filters: Record<string, any>;
  // Companies by service
  companiesByService: ICompanyByService[];
  isLoadingCompaniesByService: boolean;
  companiesByServiceError: string | null;
}
