import { LANGUAGES } from './consts';

/**
 * Handle language change by redirecting to the new locale path
 */
export const handleLanguageChange = (pathname: string, newLocale: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const pathWithoutLocale = segments.slice(1).join('/');
  const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
  window.location.href = newPath;
};

/**
 * Check if a path is currently active
 */
export const isActivePath = (pathname: string, locale: string, path: string) => {
  if (path === `/${locale}`) {
    return pathname === `/${locale}` || pathname === `/${locale}/`;
  }
  return pathname.startsWith(path);
};

/**
 * Get current language object from locale code
 */
export const getCurrentLanguage = (locale: string) => {
  return LANGUAGES.find((lang) => lang.code === locale);
};
