export { makeStore } from '@/store/store';
export type { RootState, AppDispatch, AppStore } from '@/store/store';

// Alias exports for consistency
export type { RootState as TRootState, AppDispatch as TAppDispatch } from '@/store/store';

// Export all feature actions and selectors
export { appActions, appSelectors } from './features/app';
export { userActions, userSelectors } from './features/user';
export { authActions, authSelectors } from './features/auth';
export { categoriesActions, categoriesSelectors } from './features/categories';
export { companiesActions, companiesSelectors } from './features/companies';
export { servicesActions, servicesSelectors } from './features/services';
export { companyDetailsActions, companyDetailsSelectors } from './features/companyDetails';
export { errorsActions, errorsSelectors } from './features/errors';
export { filtersActions, filtersSelectors } from './features/filters';
export { nearMeActions, nearMeSelectors } from './features/nearMe';

// Export auth thunks
export {
  loginThunk,
  registerThunk,
  sendVerificationLinkThunk,
  verifyLinkThunk,
  getCurrentUserThunk,
  forgotPasswordThunk,
  updatePasswordThunk,
  editUserProfileThunk,
  updateUserPhoneThunk,
  updateUserPasswordThunk,
} from './features/auth/thunks';

// Export categories thunks
export { getCategoriesThunk } from './features/categories/thunks';

// Export companies thunks
export { getCompaniesThunk, getCompaniesByServiceThunk } from './features/companies/thunks';

// Export services thunks
export { getServicesThunk } from './features/services/thunks';

// Export user thunks
export {
  getBookingThunk,
  cancelBookingThunk,
  getActiveTicketsThunk,
  getHistoryTicketsThunk,
  getFavoritesThunk,
  addFavoriteThunk,
  deleteFavoriteThunk,
} from './features/user/thunks';

// Export company details thunks
export {
  getCompanyDetailsThunk,
  getCompanyServicesThunk,
  getCompanyReviewsThunk,
  getEmployeeServicesThunk,
  getEmployeesByServiceThunk,
  getCompanyEmployeesThunk,
  getCompanyPortfolioThunk,
  getApartmentDetailsThunk,
  getCarDetailsThunk,
  getApartmentIntervalsThunk,
  getCarIntervalsThunk,
  createApartmentBookingThunk,
  createCarBookingThunk,
  getBeautyIntervalsThunk,
  createBeautyBookingThunk,
} from './features/companyDetails/thunks';

// Export filters thunks
export {
  getCompaniesFiltersThunk,
  getServicesFiltersThunk,
} from './features/filters/thunks';

// Export near me thunks
export { getCompaniesNearMeThunk } from './features/nearMe/thunks';
// Export ads actions, selectors, and thunks
export { adsActions, adsSelectors } from './features/ads';
export { getAdsThunk } from './features/ads/thunks';