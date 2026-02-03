import { createSlice } from '@reduxjs/toolkit';
import { nearMeInitialState } from './initialState';
import { nearMeReducers } from './reducers';
import { getCompaniesNearMeThunk } from './thunks';

export const nearMeSlice = createSlice({
  name: 'nearMe',
  initialState: nearMeInitialState,
  reducers: nearMeReducers,
  extraReducers: (builder) => {
    builder
      .addCase(getCompaniesNearMeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompaniesNearMeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companies = action.payload;
        state.error = null;
      })
      .addCase(getCompaniesNearMeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});
