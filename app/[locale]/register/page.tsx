'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, registerThunk } from '@/store';
import Link from 'next/link';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Input from '@/components/Input';
import { PhoneIcon, LockIcon, SmsIcon } from '@/components/icons';
import ModalDialog from '@/components/Modal/ModalDialog';
import * as Styled from './styled';

export default function RegisterPage() {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(authSelectors.isLoading);
  const error = useAppSelector(authSelectors.error);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSmsModal, setShowSmsModal] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
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
      setShowSmsModal(true);
      setFirstName('');
      setLastName('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
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

          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('auth.repeatPassword')}
            icon={<LockIcon width="20" height="20" />}
            required
          />

          {error && (
            <Text type="small" color="accentRed" align="center">
              {error}
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

      {/* SMS Verification Modal */}
      <ModalDialog
        isOpen={showSmsModal}
        onClose={() => setShowSmsModal(false)}
        icon={<SmsIcon />}
        title={t('auth.checkYourSms')}
      />
    </Styled.PageContainer>
  );
}

