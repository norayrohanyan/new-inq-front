import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';
import { getInitialState } from './initialState';

const servicesSlice = createSlice({
  name: 'services',
  initialState: getInitialState(),
  reducers,
});

export const servicesActions = servicesSlice.actions;

export default servicesSlice;
