import { IBookingHistory, IFavoriteCompany } from '@/types/user';

export interface IUserState {
  id: string | null;
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
  activeTickets: IBookingHistory[];
  historyTickets: IBookingHistory[];
  favorites: IFavoriteCompany[];
  isLoading: boolean;
  error: string | null;
}

