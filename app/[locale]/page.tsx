'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { authSelectors } from '@/store';

export default function Home() {
  const locale = useLocale();
  const router = useRouter();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${locale}/profile`);
    } else {
      router.push(`/${locale}/login`);
    }
  }, [locale, router, isAuthenticated]);

  return null;
}
