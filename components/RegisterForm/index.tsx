'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, registerThunk } from '@/store';
import Text from '@/components/Text';
import * as Styled from './styled';

export default function RegisterForm() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(authSelectors.isLoading);
  const error = useAppSelector(authSelectors.error);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle phone input - only allow digits, max 8
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '');
    digits = digits.replace(/^0+/, ''); // Remove leading zeros
    digits = digits.slice(0, 8); // Max 8 digits
    setPhone(digits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

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
      setSuccess(true);
      setFirstName('');
      setLastName('');
      setPhone('');
      setPassword('');
    }
  };

  return (
    <Styled.FormContainer>
      <Text type="h2" color="primaryDark" align="center">
        {t('common.register')}
      </Text>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.InputRow>
          <div>
            <Text type="small" color="secondaryDark" fontWeight="500">
              {t('auth.firstName')}
            </Text>
            <Styled.Input
              type="text"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              placeholder={t('auth.firstName')}
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <Text type="small" color="secondaryDark" fontWeight="500">
              {t('auth.lastName')}
            </Text>
            <Styled.Input
              type="text"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              placeholder={t('auth.lastName')}
              disabled={isLoading}
              required
            />
          </div>
        </Styled.InputRow>
        <div>
          <Text type="small" color="secondaryDark" fontWeight="500">
            {t('auth.phoneNumber')}
          </Text>
          <Styled.PhoneInputWrapper>
            <Styled.PhonePrefix>+374</Styled.PhonePrefix>
            <Styled.PhoneInput
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="XX XXX XXX"
              disabled={isLoading}
              inputMode="numeric"
              required
            />
          </Styled.PhoneInputWrapper>
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
        {success && (
          <Text type="small" customColor="#10B981" align="center">
            Registration successful! Please check your phone for verification link.
          </Text>
        )}
        <Styled.Button type="submit" disabled={isLoading}>
          {isLoading ? t('common.loading') : t('auth.registerButton')}
        </Styled.Button>
      </Styled.Form>
    </Styled.FormContainer>
  );
}

