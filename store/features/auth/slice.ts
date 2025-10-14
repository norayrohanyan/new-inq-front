import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';
import { getInitialState } from './initialState';

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers,
});

export const authActions = authSlice.actions;

export default authSlice;

