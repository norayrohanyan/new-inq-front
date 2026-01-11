'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Text from '@/components/Text';
import Button from '@/components/Button';
import * as Styled from '../styled';

export const SuccessScreen = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  return (
    <Styled.PageContainer>
      <Styled.SuccessContainer>
        <Styled.SuccessIcon>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="4"/>
            <path d="M35 60L52 77L85 44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Styled.SuccessIcon>
        
        <Text type="h2" color="white" fontWeight="700" align="center">
          {t('booking.thankYou')}
        </Text>
        
        <Text type="body" color="secondarySemiLight" align="center">
          {t('booking.confirmationMessage')}
        </Text>

        <Styled.SuccessButtons>
          <Button variant="secondary" onClick={() => router.push(`/${locale}`)}>
            {t('booking.backToHome')}
          </Button>
          <Button variant="primary" onClick={() => router.push(`/${locale}/profile`)}>
            {t('booking.viewBooking')}
          </Button>
        </Styled.SuccessButtons>
      </Styled.SuccessContainer>
    </Styled.PageContainer>
  );
};

