import { Middleware, isRejected } from '@reduxjs/toolkit';
import { errorsActions } from '../features/errors';

/**
 * Redux middleware to automatically catch errors from rejected thunks
 * and dispatch them to the errors slice
 */
export const errorMiddleware: Middleware = (store) => (next) => (action) => {
  // Check if action is a rejected thunk
  if (isRejected(action)) {
    const errorMessage = action.error?.message || (action.payload as any)?.error || 'An error occurred';
    
    // Dispatch error to the errors slice
    store.dispatch(errorsActions.showError(errorMessage));
  }

  return next(action);
};

