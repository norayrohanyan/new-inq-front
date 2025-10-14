import { configureStore } from '@reduxjs/toolkit';
import combinedReducers from './reducer';

export const makeStore = () => {
  return configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [],
          // Ignore these field paths in all actions
          ignoredActionPaths: [],
          // Ignore these paths in the state
          ignoredPaths: [],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

