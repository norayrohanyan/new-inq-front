'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, loginThunk } from '@/store';
import Text from '@/components/Text';
import * as Styled from './styled';

export default function LoginForm() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(authSelectors.isLoading);
  const error = useAppSelector(authSelectors.error);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginThunk({ phone, password }));
  };

  return (
    <Styled.FormContainer>
      <Text type="h2" color="primaryDark" align="center">
        {t('common.login')}
      </Text>
      <Styled.Form onSubmit={handleSubmit}>
        <div>
          <Text type="small" color="secondaryDark" fontWeight="500">
            {t('auth.phoneNumber')}
          </Text>
          <Styled.Input
            type="tel"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            placeholder="93852741"
            disabled={isLoading}
            required
          />
        </div>
        <div>
          <Text type="small" color="secondaryDark" fontWeight="500">
            {t('auth.password')}
          </Text>
          <Styled.Input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder={t('auth.password')}
            disabled={isLoading}
            required
          />
        </div>
        {error && (
          <Text type="small" color="accentRed" align="center">
            {error}
          </Text>
        )}
        <Styled.Button type="submit" disabled={isLoading}>
          {isLoading ? t('common.loading') : t('auth.loginButton')}
        </Styled.Button>
      </Styled.Form>
    </Styled.FormContainer>
  );
}

