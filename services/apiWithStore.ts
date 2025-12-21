/**
 * This file provides a way to dispatch Redux actions from the API interceptor
 * We need to set the store instance after it's created
 */

import { AppStore } from '@/store';

let storeInstance: AppStore | null = null;

export const setStoreInstance = (store: AppStore) => {
  storeInstance = store;
};

export const getStoreInstance = (): AppStore | null => {
  return storeInstance;
};

