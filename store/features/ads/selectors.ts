import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selectAdsState = (state: RootState) => state.ads;

const getAdsByPage = (pageName: string) =>
  createSelector(selectAdsState, (state) => state.ads[pageName] || []);

const getIsLoadingByPage = (pageName: string) =>
  createSelector(selectAdsState, (state) => state.isLoading[pageName] || false);

const getErrorByPage = (pageName: string) =>
  createSelector(selectAdsState, (state) => state.error[pageName] || null);

const adsSelectors = {
  getAdsByPage,
  getIsLoadingByPage,
  getErrorByPage,
};

export default adsSelectors;
