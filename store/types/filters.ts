export interface FilterOption {
  id: number | string;
  name: string;
}

export interface FilterSection {
  title: string;
  options: FilterOption[];
}

export interface IFiltersState {
  companiesFilters: Record<string, FilterSection>;
  servicesFilters: Record<string, FilterSection>;
  isLoading: boolean;
  error: string | null;
}



