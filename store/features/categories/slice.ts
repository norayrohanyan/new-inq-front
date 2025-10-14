import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';
import { getInitialState } from './initialState';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: getInitialState(),
  reducers,
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice;

