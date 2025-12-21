export interface IService {
  id: number;
  name: string;
  company_id: number;
  company_name: string;
  price: number;
  rating: number;
  address: string;
  longitude: number;
  latitude: number;
  image_urls: string[];
  discount: { 
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    percentage: number;
  } | null;
  description?: string;
}

export interface IServicesState {
  services: IService[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalServices: number;
  filters: Record<string, any>;
}
