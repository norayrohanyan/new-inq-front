import { INearMeState } from '@/store/types/nearMe';

export const nearMeInitialState: INearMeState = {
  companies: [],
  isLoading: false,
  error: null,
  selectedCategory: 'beauty_salon',
  userLocation: null,
  selectedLocation: null,
  radius: Infinity,
  locationPermission: null,
};
