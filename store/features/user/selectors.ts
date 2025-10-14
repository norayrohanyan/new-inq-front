import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selector = (state: RootState) => state.user;

const user = createSelector(selector, (state) => ({
  id: state.id,
  email: state.email,
  name: state.name,
}));

const isAuthenticated = createSelector(
  selector,
  (state) => state.isAuthenticated
);

const userId = createSelector(selector, (state) => state.id);

const userEmail = createSelector(selector, (state) => state.email);

const userName = createSelector(selector, (state) => state.name);

const activeTickets = createSelector(selector, (state) => state.activeTickets);

const historyTickets = createSelector(selector, (state) => state.historyTickets);

const favorites = createSelector(selector, (state) => state.favorites);

const isLoading = createSelector(selector, (state) => state.isLoading);

const error = createSelector(selector, (state) => state.error);

export default {
  user,
  isAuthenticated,
  userId,
  userEmail,
  userName,
  activeTickets,
  historyTickets,
  favorites,
  isLoading,
  error,
};

