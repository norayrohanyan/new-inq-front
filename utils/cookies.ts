/**
 * Cookie utilities for managing authentication tokens
 * Cookies are the single source of truth for auth state
 */

export const setCookie = (name: string, value: string, expiresAt?: string) => {
  if (typeof window === 'undefined') return;

  let cookieString = `${name}=${value}; path=/; SameSite=Lax`;

  if (expiresAt) {
    cookieString += `; expires=${new Date(expiresAt).toUTCString()}`;
  }

  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  if (typeof window === 'undefined') return;

  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const setAuthCookies = (tokens: {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
}) => {
  setCookie('accessToken', tokens.accessToken, tokens.accessTokenExpiresAt);
  setCookie('refreshToken', tokens.refreshToken, tokens.refreshTokenExpiresAt);
  
  // Store expiration dates in cookies too for validation
  if (tokens.accessTokenExpiresAt) {
    setCookie('accessTokenExpiresAt', tokens.accessTokenExpiresAt, tokens.accessTokenExpiresAt);
  }
  if (tokens.refreshTokenExpiresAt) {
    setCookie('refreshTokenExpiresAt', tokens.refreshTokenExpiresAt, tokens.refreshTokenExpiresAt);
  }
};

export const clearAuthCookies = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  deleteCookie('accessTokenExpiresAt');
  deleteCookie('refreshTokenExpiresAt');
};

