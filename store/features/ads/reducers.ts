import { PayloadAction } from '@reduxjs/toolkit';
import { IAdsState, IAd } from '@/store/types/ads';

const reducers = {
  setLoading: (state: IAdsState, action: PayloadAction<{ pageName: string; isLoading: boolean }>) => {
    const { pageName, isLoading } = action.payload;
    state.isLoading[pageName] = isLoading;
  },
  setAds: (state: IAdsState, action: PayloadAction<{ pageName: string; ads: IAd[] }>) => {
    const { pageName, ads } = action.payload;
    state.ads[pageName] = ads;
  },
  setError: (state: IAdsState, action: PayloadAction<{ pageName: string; error: string | null }>) => {
    const { pageName, error } = action.payload;
    state.error[pageName] = error;
  },
  clearAds: (state: IAdsState, action: PayloadAction<string>) => {
    const pageName = action.payload;
    delete state.ads[pageName];
    delete state.isLoading[pageName];
    delete state.error[pageName];
  },
};

export default reducers;
