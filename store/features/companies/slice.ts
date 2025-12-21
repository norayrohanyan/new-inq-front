import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';
import { getInitialState } from './initialState';

const companiesSlice = createSlice({
  name: 'companies',
  initialState: getInitialState(),
  reducers,
});

export const companiesActions = companiesSlice.actions;

export default companiesSlice;
