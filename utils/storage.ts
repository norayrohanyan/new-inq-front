const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_TOKEN_EXPIRES_AT: 'access_token_expires_at',
  REFRESH_TOKEN_EXPIRES_AT: 'refresh_token_expires_at',
} as const;

export const storage = {
  setTokens: (
    accessToken: string,
    refreshToken: string,
    accessTokenExpiresAt: string,
    refreshTokenExpiresAt: string
  ) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT, accessTokenExpiresAt);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT, refreshTokenExpiresAt);
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
    return null;
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
    return null;
  },

  getAccessTokenExpiresAt: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT);
    }
    return null;
  },

  getRefreshTokenExpiresAt: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT);
    }
    return null;
  },

  clearTokens: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT);
    }
  },

  isTokenExpired: (expiresAt: string | null): boolean => {
    if (!expiresAt) return true;
    const expirationTime = new Date(expiresAt).getTime();
    const currentTime = new Date().getTime();
    return currentTime >= expirationTime;
  },
};

