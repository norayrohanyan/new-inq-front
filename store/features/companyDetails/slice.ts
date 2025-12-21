import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { companyDetailsReducers } from './reducers';

export const companyDetailsSlice = createSlice({
  name: 'companyDetails',
  initialState,
  reducers: companyDetailsReducers,
});


