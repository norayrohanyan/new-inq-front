import { combineReducers } from '@reduxjs/toolkit';
import { appSlice } from './features/app';
import { userSlice } from './features/user';
import { authSlice } from './features/auth';
import { categoriesSlice } from './features/categories';
import { companiesSlice } from './features/companies';
import { servicesSlice } from './features/services';
import { companyDetailsSlice } from './features/companyDetails';
import { errorsSlice } from './features/errors';
import { filtersSlice } from './features/filters';
import { nearMeSlice } from './features/nearMe';

const combinedReducers = combineReducers({
  app: appSlice.reducer,
  user: userSlice.reducer,
  auth: authSlice.reducer,
  categories: categoriesSlice.reducer,
  companies: companiesSlice.reducer,
  services: servicesSlice.reducer,
  companyDetails: companyDetailsSlice.reducer,
  errors: errorsSlice.reducer,
  filters: filtersSlice.reducer,
  nearMe: nearMeSlice.reducer,
});

export default combinedReducers;

