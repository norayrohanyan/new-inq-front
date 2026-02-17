import { PayloadAction } from '@reduxjs/toolkit';
import { INearMeState, INearMeCompany } from '@/store/types/nearMe';

export const nearMeReducers = {
  setLoading: (state: INearMeState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  setError: (state: INearMeState, action: PayloadAction<string | null>) => {
    state.error = action.payload;
  },
  setCompanies: (state: INearMeState, action: PayloadAction<INearMeCompany[]>) => {
    state.companies = action.payload;
  },
  setSelectedCategory: (state: INearMeState, action: PayloadAction<string>) => {
    state.selectedCategory = action.payload;
  },
  setUserLocation: (
    state: INearMeState,
    action: PayloadAction<{ latitude: number; longitude: number } | null>
  ) => {
    state.userLocation = action.payload;
  },
  setSelectedLocation: (
    state: INearMeState,
    action: PayloadAction<{ latitude: number; longitude: number } | null>
  ) => {
    state.selectedLocation = action.payload;
  },
  setRadius: (state: INearMeState, action: PayloadAction<number>) => {
    state.radius = action.payload;
  },
  setLocationPermission: (
    state: INearMeState,
    action: PayloadAction<'granted' | 'denied' | 'prompt' | null>
  ) => {
    state.locationPermission = action.payload;
  },
  clearCompanies: (state: INearMeState) => {
    state.companies = [];
  },
};
