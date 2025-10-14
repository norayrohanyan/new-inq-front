import { Draft, PayloadAction } from '@reduxjs/toolkit';

/**
 * Helper function to create reducers with proper typing
 * This ensures reducers work correctly with Redux Toolkit's Immer
 */
export const reducerCreatorProducer =
  <TState>() =>
  <
    TReducers extends {
      [key: string]: (
        state: Draft<TState>,
        action: PayloadAction<any>
      ) => void | TState;
    }
  >(
    reducers: TReducers
  ) =>
    reducers;

