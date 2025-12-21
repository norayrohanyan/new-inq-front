import { RootState } from '@/store/store';

export const companyDetailsSelectors = {
  companyDetails: (state: RootState) => state.companyDetails.companyDetails,
  apartmentDetails: (state: RootState) => state.companyDetails.apartmentDetails,
  carDetails: (state: RootState) => state.companyDetails.carDetails,
  services: (state: RootState) => state.companyDetails.services,
  employees: (state: RootState) => state.companyDetails.employees,
  portfolio: (state: RootState) => state.companyDetails.portfolio,
  intervals: (state: RootState) => state.companyDetails.intervals,
  beautyTimeSlots: (state: RootState) => state.companyDetails.beautyTimeSlots,
  isLoading: (state: RootState) => state.companyDetails.isLoading,
  isLoadingIntervals: (state: RootState) => state.companyDetails.isLoadingIntervals,
  isLoadingTimeSlots: (state: RootState) => state.companyDetails.isLoadingTimeSlots,
  error: (state: RootState) => state.companyDetails.error,
};


