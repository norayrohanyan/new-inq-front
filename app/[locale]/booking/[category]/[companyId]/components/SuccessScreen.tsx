'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Text from '@/components/Text';
import Button from '@/components/Button';
import * as Styled from '../styled';
import { CheckedIcon } from '@/components/icons/CheckedIcon';

export const SuccessScreen = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Styled.PageContainer>
      <Styled.SuccessContainer>
        <Styled.SuccessIcon>
          <CheckedIcon
            width="120"
            height="120"
            fill="currentColor"
          />
        </Styled.SuccessIcon>
        
        <Text type="h2" color="white" fontWeight="700" align="center">
          {t('booking.thankYou')}
        </Text>
        
        <Text type="body" color="secondarySemiLight" align="center">
          {t('booking.confirmationMessage')}
        </Text>

        <Styled.SuccessButtons>
          <Button variant="secondary" onClick={() => router.push(`/${locale}/categories`)}>
            {t('booking.backToHome')}
          </Button>
          <Button variant="primary" onClick={() => router.push(`/${locale}/profile?tab=tickets`)}>
            {t('booking.viewBooking')}
          </Button>
        </Styled.SuccessButtons>
      </Styled.SuccessContainer>
    </Styled.PageContainer>
  );
};

