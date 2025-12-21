'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAppDispatch } from '@/lib/hooks';
import { verifyLinkThunk } from '@/store';
import Button from '@/components/Button';
import { SuccessIcon, ErrorIcon } from '@/components/icons';
import * as Styled from './styled';

export default function VerifyPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your link...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const hash = searchParams.get('hash');

    if (!hash) {
      setStatus('error');
      setErrorMessage('Invalid verification link. Missing hash parameter.');
      return;
    }

    verifyLink(hash);
  }, [searchParams]);

  const verifyLink = async (hash: string) => {
    try {
      setStatus('loading');
      setMessage('Verifying your link...');

      const result = await dispatch(verifyLinkThunk(hash));

      if (verifyLinkThunk.fulfilled.match(result)) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(
          result.payload as string || 'Verification failed. The link may be invalid or expired.'
        );
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('An unexpected error occurred during verification.');
    }
  };

  const handleMakeBooking = () => {
    router.push(`/${locale}/categories`);
  };

  const handleGoHome = () => {
    router.push(`/${locale}`);
  };

  return (
    <Styled.PageContainer>
      <Styled.ContentCard>
        {status === 'loading' && (
          <>
            <Styled.LoadingSpinner />
            <Styled.Message>{message}</Styled.Message>
          </>
        )}

        {status === 'success' && (
          <Styled.ModalContent>
            <Styled.IconWrapper>
              <SuccessIcon />
            </Styled.IconWrapper>
            <Styled.ModalTitle>{t('auth.signUpComplete')}</Styled.ModalTitle>
            <Styled.ButtonWrapper>
              <Button 
                variant="primary" 
                size="medium" 
                rounded
                fullWidth
                onClick={handleMakeBooking}
              >
                {t('auth.makeBooking')}
              </Button>
            </Styled.ButtonWrapper>
          </Styled.ModalContent>
        )}

        {status === 'error' && (
          <Styled.ModalContent>
            <Styled.IconWrapper>
              <ErrorIcon />
            </Styled.IconWrapper>
            <Styled.ModalTitle>{t('auth.verificationFailed')}</Styled.ModalTitle>
            {errorMessage && (
              <Styled.ModalDescription>{errorMessage}</Styled.ModalDescription>
            )}
            <Styled.ButtonWrapper>
              <Button 
                variant="primary" 
                size="medium" 
                rounded
                fullWidth
                onClick={handleGoHome}
              >
                {t('common.returnHome')}
              </Button>
            </Styled.ButtonWrapper>
          </Styled.ModalContent>
        )}
      </Styled.ContentCard>
    </Styled.PageContainer>
  );
}

