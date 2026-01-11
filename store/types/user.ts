import { IBookingHistory, IFavoriteCompany, IBookingDetail } from '@/types/user';

export interface IUserState {
  id: string | null;
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
  activeTickets: IBookingHistory[];
  historyTickets: IBookingHistory[];
  favorites: IFavoriteCompany[];
  currentBooking: IBookingDetail | null;
  currentBookingLoading: boolean;
  isLoading: boolean;
  error: string | null;
}

