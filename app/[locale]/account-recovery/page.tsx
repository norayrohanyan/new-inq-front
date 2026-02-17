'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, authActions, forgotPasswordThunk } from '@/store';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { PhoneIcon } from '@/components/icons';
import * as Styled from './styled';

export default function AccountRecoveryPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(authSelectors.isLoading);
  const error = useAppSelector(authSelectors.error);

  const [phone, setPhone] = useState('');

  useEffect(() => {
    dispatch(authActions.clearError());
  }, [dispatch]);

  // Handle phone input - only allow digits, max 8
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '');
    digits = digits.replace(/^0+/, ''); // Remove leading zeros
    digits = digits.slice(0, 8); // Max 8 digits
    setPhone(digits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      forgotPasswordThunk({
        phone,
        url: window.location.origin + `/${locale}/password-reset`,
      })
    );

    if (forgotPasswordThunk.fulfilled.match(result)) {
      sessionStorage.setItem('registerPhone', phone);
      sessionStorage.setItem('smsVerificationType', '2');
      sessionStorage.setItem('smsTimerExpiresAt', String(Date.now() + 150 * 1000));
      router.push(`/${locale}/check-sms`);
    }
  };

  return (
    <Styled.PageContainer>
      <Styled.RecoveryCard>
        <Text type="h1" color="white" align="center">
          {t('auth.accountRecovery')}
        </Text>

        <Text type="body" customColor="rgba(255, 255, 255, 0.7)" align="center">
          {t('auth.recoveryDescription')}
        </Text>

        <Styled.Form onSubmit={handleSubmit}>
          <Styled.PhoneInputWrapper>
            <Styled.PhoneIconWrapper>
              <PhoneIcon width="20" height="20" />
            </Styled.PhoneIconWrapper>
            <Styled.PhonePrefix>+374</Styled.PhonePrefix>
            <Styled.PhoneInput
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="XX XXX XXX"
              inputMode="numeric"
              required
            />
          </Styled.PhoneInputWrapper>

          {error && (
            <Text type="small" color="accentRed" align="center">
              {error}
            </Text>
          )}

          <Button variant="primary" size="medium" fullWidth type="submit" isLoading={isLoading}>
            {t('auth.next')}
          </Button>
        </Styled.Form>
      </Styled.RecoveryCard>

    </Styled.PageContainer>
  );
}



