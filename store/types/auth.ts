import { IUser } from '@/types/auth';

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: string | null;
  refreshTokenExpiresAt: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

