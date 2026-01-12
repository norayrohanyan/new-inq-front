'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, loginThunk } from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Input from '@/components/Input';
import { PhoneIcon, LockIcon } from '@/components/icons';
import * as Styled from './styled';

export default function LoginPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  const isLoading = useAppSelector(authSelectors.isLoading);
  const error = useAppSelector(authSelectors.error);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Get the return URL from query params (where user wanted to go before login)
  const returnUrl = searchParams.get('returnUrl');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginThunk({ phone, password }));
    
    // Redirect to the return URL if provided, otherwise to profile
    if (loginThunk.fulfilled.match(result)) {
      if (returnUrl) {
        // Decode and redirect to the original destination
        router.push(decodeURIComponent(returnUrl));
      } else {
        router.push(`/${locale}/profile`);
      }
    }
  };

  return (
    <Styled.PageContainer>
      <Styled.LoginCard>
        <Text type="h1" color="white" align="center">
          {t('common.login')}
        </Text>

        <Styled.Form onSubmit={handleLogin}>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('auth.phoneNumber') + ' (ex. 091234567)'}
            icon={<PhoneIcon width="20" height="20" />}
            required
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.password')}
            icon={<LockIcon width="20" height="20" />}
            required
          />

          <Styled.ForgotPassword>
            <Text type="small" customColor="rgba(255, 255, 255, 0.7)">
              {t('auth.forgotPassword')}{' '}
              <Styled.RecoveryLink href={`/${locale}/account-recovery`}>
                {t('auth.accountRecovery')}
              </Styled.RecoveryLink>
            </Text>
          </Styled.ForgotPassword>

          {error && (
            <Text type="small" color="accentRed" align="center">
              {error}
            </Text>
          )}

          <Button variant="primary" size="medium" fullWidth type="submit" isLoading={isLoading}>
            {t('auth.loginButton')}
          </Button>

          <Text type="small" customColor="rgba(255, 255, 255, 0.7)" align="center">
            {t('auth.dontHaveAccount')}{' '}
            <Link href={`/${locale}/register`}>
              <Styled.SignUpLink>{t('auth.signUp')}</Styled.SignUpLink>
            </Link>
          </Text>
        </Styled.Form>
      </Styled.LoginCard>
    </Styled.PageContainer>
  );
}

