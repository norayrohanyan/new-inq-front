import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';
import { getInitialState } from './initialState';

const appSlice = createSlice({
  name: 'app',
  initialState: getInitialState(),
  reducers,
});

export const appActions = appSlice.actions;

export default appSlice;

