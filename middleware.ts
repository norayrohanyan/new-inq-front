import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

// Protected routes that require authentication
const protectedRoutes = ['/profile'];

// Auth routes that should redirect if already authenticated
const authRoutes = ['/login', '/register'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get tokens and expiration dates from cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const accessTokenExpiresAt = request.cookies.get('accessTokenExpiresAt')?.value;
  
  // Check if token is expired
  const isTokenExpired = (expiresAt?: string): boolean => {
    if (!expiresAt) return true;
    const expirationTime = new Date(expiresAt).getTime();
    const currentTime = new Date().getTime();
    return currentTime >= expirationTime;
  };
  
  // User is authenticated if they have valid tokens
  const isAuthenticated = !!(
    (accessToken && !isTokenExpired(accessTokenExpiresAt)) || 
    refreshToken
  );
  
  // Extract locale and path without locale
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ru|hy)/, '') || '/';
  
  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathnameWithoutLocale.startsWith(route)
  );
  
  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathnameWithoutLocale.startsWith(route)
  );
  
  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const locale = pathname.split('/')[1] || 'en';
    // Save the intended destination so user is redirected back after login
    const returnUrl = encodeURIComponent(pathname + request.nextUrl.search);
    return NextResponse.redirect(new URL(`/${locale}/login?returnUrl=${returnUrl}`, request.url));
  }
  
  // Redirect authenticated users away from auth routes (login/register)
  if (isAuthRoute && isAuthenticated) {
    const locale = pathname.split('/')[1] || 'en';
    return NextResponse.redirect(new URL(`/${locale}/profile`, request.url));
  }
  
  // Continue with i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|ru|hy)/:path*'],
};

