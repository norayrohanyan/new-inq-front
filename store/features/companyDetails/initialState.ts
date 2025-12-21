import { ICompanyDetailsState } from '@/store/types/companyDetails';

export const initialState: ICompanyDetailsState = {
  companyDetails: null,
  apartmentDetails: null,
  carDetails: null,
  services: [],
  employees: [],
  portfolio: [],
  intervals: {},
  beautyTimeSlots: [],
  isLoadingIntervals: false,
  isLoadingTimeSlots: false,
  isLoading: false,
  error: null,
};


