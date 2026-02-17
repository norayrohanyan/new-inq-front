'use client';

import { useTranslations } from 'next-intl';
import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';

export default function NotFound() {
  const t = useTranslations();

  return (
    <NotFoundPage
      title={t('errors.pageNotFound.title')}
      description={t('errors.pageNotFound.description')}
      buttonText={t('errors.returnHome')}
    />
  );
}
