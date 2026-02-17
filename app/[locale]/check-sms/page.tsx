'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, sendVerificationLinkThunk } from '@/store';
import { SmsIcon } from '@/components/icons';
import * as Styled from './styled';
import Text from '@/components/Text';

const DEFAULT_TIMER = 23;

function getRemainingSeconds(): number {
  if (typeof window === 'undefined') return DEFAULT_TIMER;
  const expiresAt = sessionStorage.getItem('smsTimerExpiresAt');
  if (!expiresAt) return 0;
  const remaining = Math.ceil((Number(expiresAt) - Date.now()) / 1000);
  return Math.max(remaining, 0);
}

function setExpiryFromSeconds(seconds: number) {
  sessionStorage.setItem('smsTimerExpiresAt', String(Date.now() + seconds * 1000));
}

export default function CheckSmsPage() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(authSelectors.isLoading);

  const [timeLeft, setTimeLeft] = useState(getRemainingSeconds);
  const [canResend, setCanResend] = useState(() => getRemainingSeconds() <= 0);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      const remaining = getRemainingSeconds();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        setCanResend(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = useCallback(async () => {
    if (!canResend || isLoading) return;

    const phone = sessionStorage.getItem('registerPhone');
    if (!phone) return;

    const type = Number(sessionStorage.getItem('smsVerificationType')) || 1;
    const result = await dispatch(sendVerificationLinkThunk({ phone, type }));

    if (sendVerificationLinkThunk.fulfilled.match(result)) {
      const newTimer = result.payload?.next_request_seconds ?? DEFAULT_TIMER;
      setExpiryFromSeconds(newTimer);
      setTimeLeft(newTimer);
      setCanResend(false);
    }
  }, [canResend, isLoading, dispatch]);

  return (
    <Styled.PageContainer>
      <Styled.ContentCard>
        <Styled.IconWrapper>
          <SmsIcon />
        </Styled.IconWrapper>

        <Text type="h2" color="white" fontWeight="600" align="center">
          {t('auth.checkYourSms')}
        </Text>

        <Styled.Timer>{formatTime(timeLeft)}</Styled.Timer>

        <Styled.ResendButton
          $disabled={!canResend || isLoading}
          onClick={handleResend}
          disabled={!canResend || isLoading}
        >
          {isLoading ? t('common.loading') : t('auth.sendLinkAgain')}
        </Styled.ResendButton>
      </Styled.ContentCard>
    </Styled.PageContainer>
  );
}
