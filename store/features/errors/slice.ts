import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';
import { getInitialState } from './initialState';

const errorsSlice = createSlice({
  name: 'errors',
  initialState: getInitialState(),
  reducers,
});

export const errorsActions = errorsSlice.actions;

export default errorsSlice;

