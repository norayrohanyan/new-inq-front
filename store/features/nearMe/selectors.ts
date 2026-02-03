import { RootState } from '@/store/store';

export const nearMeSelectors = {
  companies: (state: RootState) => state.nearMe.companies,
  isLoading: (state: RootState) => state.nearMe.isLoading,
  error: (state: RootState) => state.nearMe.error,
  selectedCategory: (state: RootState) => state.nearMe.selectedCategory,
  userLocation: (state: RootState) => state.nearMe.userLocation,
  radius: (state: RootState) => state.nearMe.radius,
  locationPermission: (state: RootState) => state.nearMe.locationPermission,
};
