import { PayloadAction } from '@reduxjs/toolkit';
import { IErrorState, IError } from './types';

const reducers = {
  addError: (state: IErrorState, action: PayloadAction<Omit<IError, 'id' | 'timestamp'>>) => {
    const newError: IError = {
      ...action.payload,
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };
    state.errors.push(newError);
  },

  removeError: (state: IErrorState, action: PayloadAction<string>) => {
    state.errors = state.errors.filter((error) => error.id !== action.payload);
  },

  clearErrors: (state: IErrorState) => {
    state.errors = [];
  },

  showError: (state: IErrorState, action: PayloadAction<string>) => {
    const newError: IError = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      message: action.payload,
      type: 'error',
      timestamp: Date.now(),
    };
    state.errors.push(newError);
  },

  showSuccess: (state: IErrorState, action: PayloadAction<string>) => {
    const newError: IError = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      message: action.payload,
      type: 'success',
      timestamp: Date.now(),
    };
    state.errors.push(newError);
  },

  showInfo: (state: IErrorState, action: PayloadAction<string>) => {
    const newError: IError = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      message: action.payload,
      type: 'info',
      timestamp: Date.now(),
    };
    state.errors.push(newError);
  },

  showWarning: (state: IErrorState, action: PayloadAction<string>) => {
    const newError: IError = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      message: action.payload,
      type: 'warning',
      timestamp: Date.now(),
    };
    state.errors.push(newError);
  },
};

export default reducers;

