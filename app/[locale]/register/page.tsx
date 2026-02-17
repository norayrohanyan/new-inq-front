'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, authActions, registerThunk } from '@/store';
import Link from 'next/link';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Input from '@/components/Input';
import { PhoneIcon, LockIcon } from '@/components/icons';
import * as Styled from './styled';

export default function RegisterPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(authSelectors.isLoading);
  const error = useAppSelector(authSelectors.error);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError(t('auth.passwordsDoNotMatch'));
      return;
    }

    const result = await dispatch(
      registerThunk({
        first_name: firstName,
        last_name: lastName,
        phone,
        password,
        url: window.location.origin + '/booking',
      })
    );

    if (registerThunk.fulfilled.match(result)) {
      const timerSeconds = result.payload?.next_request_seconds ?? 150;
      sessionStorage.setItem('registerPhone', phone);
      sessionStorage.setItem('smsTimerExpiresAt', String(Date.now() + timerSeconds * 1000));
      router.push(`/${locale}/check-sms`);
    }
  };

  return (
    <Styled.PageContainer>
      <Styled.RegisterCard>
        <Text type="h1" color="white" align="center">
          {t('auth.signUp')}
        </Text>

        <Styled.Form onSubmit={handleRegister}>
          <Styled.InputRow>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t('auth.firstName')}
              required
            />
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t('auth.lastName')}
              required
            />
          </Styled.InputRow>

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

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.password')}
            icon={<LockIcon width="20" height="20" />}
            required
          />

          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('auth.repeatPassword')}
            icon={<LockIcon width="20" height="20" />}
            required
          />

          {(error || validationError) && (
            <Text type="small" color="accentRed" align="center">
              {validationError || error}
            </Text>
          )}

          <Button variant="primary" size="medium" fullWidth type="submit" isLoading={isLoading}>
            {t('auth.registerButton')}
          </Button>

          <Text type="small" customColor="rgba(255, 255, 255, 0.7)" align="center">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link href={`/${locale}/login`}>
              <Styled.LoginLink>{t('common.login')}</Styled.LoginLink>
            </Link>
          </Text>
        </Styled.Form>
      </Styled.RegisterCard>

    </Styled.PageContainer>
  );
}

