import { PayloadAction } from '@reduxjs/toolkit';
import { reducerCreatorProducer } from '@/store/common';
import { IUserState } from '@/store/types/user';
import { IBookingHistory, IFavoriteCompany } from '@/types/user';

const reducers = reducerCreatorProducer<IUserState>()({
  setUser: (
    state,
    action: PayloadAction<{
      id: string;
      email: string;
      name: string;
    }>
  ) => {
    state.id = action.payload.id;
    state.email = action.payload.email;
    state.name = action.payload.name;
    state.isAuthenticated = true;
  },

  clearUser: (state) => {
    state.id = null;
    state.email = null;
    state.name = null;
    state.isAuthenticated = false;
  },

  updateUserName: (state, action: PayloadAction<string>) => {
    state.name = action.payload;
  },

  setLoading: (state, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },

  setActiveTickets: (state, action: PayloadAction<IBookingHistory[]>) => {
    state.activeTickets = action.payload;
    state.isLoading = false;
    state.error = null;
  },

  setHistoryTickets: (state, action: PayloadAction<IBookingHistory[]>) => {
    state.historyTickets = action.payload;
    state.isLoading = false;
    state.error = null;
  },

  setFavorites: (state, action: PayloadAction<IFavoriteCompany[]>) => {
    state.favorites = action.payload;
    state.isLoading = false;
    state.error = null;
  },

  removeFavorite: (state, action: PayloadAction<number>) => {
    state.favorites = state.favorites.filter((fav) => fav.id !== action.payload);
  },

  setError: (state, action: PayloadAction<string | null>) => {
    state.error = action.payload;
    state.isLoading = false;
  },

  clearError: (state) => {
    state.error = null;
  },

  clearUserData: (state) => {
    state.activeTickets = [];
    state.historyTickets = [];
    state.favorites = [];
    state.error = null;
  },
});

export default reducers;

