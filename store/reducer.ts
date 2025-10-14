import { combineReducers } from '@reduxjs/toolkit';
import { appSlice } from './features/app';
import { userSlice } from './features/user';
import { authSlice } from './features/auth';
import { categoriesSlice } from './features/categories';

const combinedReducers = combineReducers({
  app: appSlice.reducer,
  user: userSlice.reducer,
  auth: authSlice.reducer,
  categories: categoriesSlice.reducer,
});

export default combinedReducers;

