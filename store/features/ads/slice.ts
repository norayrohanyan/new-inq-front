import { createSlice } from '@reduxjs/toolkit';
import { getInitialState } from './initialState';
import reducers from './reducers';

const adsSlice = createSlice({
  name: 'ads',
  initialState: getInitialState(),
  reducers,
});

export const adsActions = adsSlice.actions;
export default adsSlice.reducer;
