import { ICompanyDetailsState } from '@/store/types/companyDetails';

export const companyDetailsReducers = {
  setLoading(state: ICompanyDetailsState, action: { payload: boolean }) {
    state.isLoading = action.payload;
  },

  setLoadingIntervals(state: ICompanyDetailsState, action: { payload: boolean }) {
    state.isLoadingIntervals = action.payload;
  },

  setLoadingTimeSlots(state: ICompanyDetailsState, action: { payload: boolean }) {
    state.isLoadingTimeSlots = action.payload;
  },

  setError(state: ICompanyDetailsState, action: { payload: string | null }) {
    state.error = action.payload;
  },

  setCompanyDetails(state: ICompanyDetailsState, action: { payload: any }) {
    state.companyDetails = action.payload;
  },

  setApartmentDetails(state: ICompanyDetailsState, action: { payload: any }) {
    state.apartmentDetails = action.payload;
  },

  setCarDetails(state: ICompanyDetailsState, action: { payload: any }) {
    state.carDetails = action.payload;
  },

  setServices(state: ICompanyDetailsState, action: { payload: any[] }) {
    state.services = action.payload;
  },

  setEmployees(state: ICompanyDetailsState, action: { payload: any[] }) {
    state.employees = action.payload;
  },

  setPortfolio(state: ICompanyDetailsState, action: { payload: string[] }) {
    state.portfolio = action.payload;
  },

  setIntervals(state: ICompanyDetailsState, action: { payload: Record<string, any> }) {
    state.intervals = action.payload;
  },

  appendIntervals(state: ICompanyDetailsState, action: { payload: Record<string, any> }) {
    // Merge new intervals with existing ones
    state.intervals = { ...state.intervals, ...action.payload };
  },

  setBeautyTimeSlots(state: ICompanyDetailsState, action: { payload: any[] }) {
    state.beautyTimeSlots = action.payload;
  },

  setLoadingReviews(state: ICompanyDetailsState, action: { payload: boolean }) {
    state.isLoadingReviews = action.payload;
  },

  setReviews(state: ICompanyDetailsState, action: { payload: any[] }) {
    state.reviews = action.payload;
  },

  setReviewsPagination(state: ICompanyDetailsState, action: { payload: any }) {
    state.reviewsPagination = action.payload;
  },

  clearCompanyDetails(state: ICompanyDetailsState) {
    state.companyDetails = null;
    state.apartmentDetails = null;
    state.carDetails = null;
    state.services = [];
    state.employees = [];
    state.portfolio = [];
    state.intervals = {};
    state.beautyTimeSlots = [];
    state.reviews = [];
    state.reviewsPagination = null;
    state.error = null;
  },
};


