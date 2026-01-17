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
  reviews: [],
  reviewsPagination: null,
  isLoadingIntervals: false,
  isLoadingTimeSlots: false,
  isLoadingReviews: false,
  isLoading: false,
  error: null,
};


