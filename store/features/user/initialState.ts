import { IUserState } from '@/store/types/user';

export const getInitialState = (): IUserState => ({
  id: null,
  email: null,
  name: null,
  isAuthenticated: false,
  activeTickets: [],
  historyTickets: [],
  favorites: [],
  currentBooking: null,
  currentBookingLoading: false,
  isLoading: false,
  error: null,
});

