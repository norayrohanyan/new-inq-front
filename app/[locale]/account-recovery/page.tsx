'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, forgotPasswordThunk } from '@/store';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Input from '@/components/Input';
import { PhoneIcon, SmsIcon } from '@/components/icons';
import ModalDialog from '@/components/Modal/ModalDialog';
import * as Styled from './styled';

export default function AccountRecoveryPage() {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(authSelectors.isLoading);
  const error = useAppSelector(authSelectors.error);

  const [phone, setPhone] = useState('');
  const [showSmsModal, setShowSmsModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      forgotPasswordThunk({
        phone,
        url: window.location.origin + `/${locale}/password-reset`,
      })
    );

    if (forgotPasswordThunk.fulfilled.match(result)) {
      setShowSmsModal(true);
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
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('auth.phoneNumber') + ' (ex. 091234567)'}
            icon={<PhoneIcon width="20" height="20" />}
            required
          />

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

      {/* SMS Modal */}
      <ModalDialog
        isOpen={showSmsModal}
        onClose={() => setShowSmsModal(false)}
        icon={<SmsIcon />}
        title={t('auth.checkYourSms')}
      />
    </Styled.PageContainer>
  );
}


