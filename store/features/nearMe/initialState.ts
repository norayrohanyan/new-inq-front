import { INearMeState } from '@/store/types/nearMe';

export const nearMeInitialState: INearMeState = {
  companies: [],
  isLoading: false,
  error: null,
  selectedCategory: 'beauty_salon',
  userLocation: null,
  radius: 5000, // 5km default
  locationPermission: null,
};
