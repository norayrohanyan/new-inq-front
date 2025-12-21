import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';
import { getInitialState } from './initialState';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: getInitialState(),
  reducers,
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice;


