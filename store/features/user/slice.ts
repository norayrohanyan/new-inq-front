import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';
import { getInitialState } from './initialState';

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers,
});

export const userActions = userSlice.actions;

export default userSlice;

