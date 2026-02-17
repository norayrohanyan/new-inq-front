'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';
import * as Styled from '@/components/NotFoundPage/styled';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const getHomeUrl = () => {
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] || 'en';
    return `/${locale}`;
  };

  return (
    <Styled.ErrorPageContainer>
      <Styled.ErrorContent>
        <Styled.ErrorCode type="h1" customColor="#FF8243">
          500
        </Styled.ErrorCode>

        <Styled.ErrorTitle type="h2" color="white">
          {t('errors.serverError.title')}
        </Styled.ErrorTitle>

        <Styled.ErrorDescription type="body" customColor="rgba(255, 255, 255, 0.7)">
          {t('errors.serverError.description')}
        </Styled.ErrorDescription>

        <Styled.ErrorButtonWrapper>
          <Button
            variant="primary"
            size="medium"
            rounded
            onClick={() => { window.location.href = getHomeUrl(); }}
          >
            {t('errors.returnHome')}
          </Button>
        </Styled.ErrorButtonWrapper>
      </Styled.ErrorContent>
    </Styled.ErrorPageContainer>
  );
}
