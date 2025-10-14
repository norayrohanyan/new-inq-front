export { makeStore } from '@/store/store';
export type { RootState, AppDispatch, AppStore } from '@/store/store';

// Alias exports for consistency
export type { RootState as TRootState, AppDispatch as TAppDispatch } from '@/store/store';

// Export all feature actions and selectors
export { appActions, appSelectors } from './features/app';
export { userActions, userSelectors } from './features/user';
export { authActions, authSelectors } from './features/auth';
export { categoriesActions, categoriesSelectors } from './features/categories';

// Export auth thunks
export {
  loginThunk,
  registerThunk,
  refreshTokensThunk,
  verifyLinkThunk,
  fetchUserProfileThunk,
} from './features/auth/thunks';

// Export categories thunks
export { getCategoriesThunk } from './features/categories/thunks';

// Export user thunks
export {
  getActiveTicketsThunk,
  getHistoryTicketsThunk,
  getFavoritesThunk,
  addFavoriteThunk,
  deleteFavoriteThunk,
} from './features/user/thunks';

