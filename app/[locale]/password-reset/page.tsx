'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, verifyLinkThunk, updatePasswordThunk } from '@/store';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Input from '@/components/Input';
import { LockIcon, SuccessIcon, ErrorIcon } from '@/components/icons';
import * as Styled from './styled';

export default function PasswordResetPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(authSelectors.isLoading);

  const [status, setStatus] = useState<'verifying' | 'form' | 'success' | 'error'>('verifying');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const verifiedRef = useRef(false);

  useEffect(() => {
    if (verifiedRef.current) return;

    const hash = searchParams.get('hash');

    if (!hash) {
      setStatus('error');
      setError('Invalid password reset link');
      return;
    }

    verifiedRef.current = true;
    verifyResetLink(hash);
  }, [searchParams]);

  const verifyResetLink = async (hash: string) => {
    try {
      setStatus('verifying');
      const result = await dispatch(verifyLinkThunk(hash));

      if (verifyLinkThunk.fulfilled.match(result)) {
        const tokens = result.payload.tokens;
        const token = 'token' in tokens ? tokens.token : tokens.access_token;
        setResetToken(token);
        setStatus('form');
      } else {
        setStatus('error');
        setError(result.payload as string || 'Verification failed');
      }
    } catch (err) {
      setStatus('error');
      setError('An error occurred during verification');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(t('auth.passwordsDoNotMatch'));
      return;
    }

    if (password.length < 8) {
      setError(t('auth.passwordTooShort'));
      return;
    }

    const result = await dispatch(updatePasswordThunk({ password, token: resetToken! }));

    if (updatePasswordThunk.fulfilled.match(result)) {
      setStatus('success');
      // Password changed successfully - clear the temporary reset token
      // User will need to login with their new password
    } else {
      setError(result.payload as string || 'Failed to update password');
    }
  };

  const handleGoToLogin = () => {
    router.push(`/${locale}/login`);
  };

  const handleGoHome = () => {
    router.push(`/${locale}`);
  };

  return (
    <Styled.PageContainer>
      <Styled.ContentCard>
        {status === 'verifying' && (
          <>
            <Styled.LoadingSpinner />
            <Text type="body" color="white" align="center">
              {t('common.loading')}
            </Text>
          </>
        )}

        {status === 'form' && (
          <Styled.FormContent>
            <Text type="h1" color="white" align="center">
              {t('auth.accountRecovery')}
            </Text>

            <Text type="body" customColor="rgba(255, 255, 255, 0.7)" align="center">
              {t('auth.enterNewPassword')}
            </Text>

            <Styled.Form onSubmit={handleSubmit}>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.password')}
                icon={<LockIcon width="20" height="20" />}
                required
                minLength={8}
              />

              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('auth.repeatPassword')}
                icon={<LockIcon width="20" height="20" />}
                required
                minLength={8}
              />

              {error && (
                <Text type="small" color="accentRed" align="center">
                  {error}
                </Text>
              )}

              <Button variant="primary" size="medium" fullWidth type="submit" isLoading={isLoading}>
                {t('auth.changePassword')}
              </Button>
            </Styled.Form>
          </Styled.FormContent>
        )}

        {status === 'success' && (
          <Styled.SuccessContent>
            <Styled.IconWrapper>
              <SuccessIcon width={120} height={120} />
            </Styled.IconWrapper>
            <Styled.SuccessTitle>{t('auth.recoveryComplete')}</Styled.SuccessTitle>
            <Text type="body" customColor="rgba(255, 255, 255, 0.7)" align="center">
              {t('auth.passwordChangedSuccess')}
            </Text>
            <Styled.ButtonWrapper>
              <Button 
                variant="primary" 
                size="medium" 
                rounded
                fullWidth
                onClick={handleGoToLogin}
              >
                {t('common.login')}
              </Button>
            </Styled.ButtonWrapper>
          </Styled.SuccessContent>
        )}

        {status === 'error' && (
          <Styled.ErrorContent>
            <Styled.IconWrapper>
              <ErrorIcon width={120} height={120} />
            </Styled.IconWrapper>
            <Styled.ErrorTitle>{t('auth.verificationFailed')}</Styled.ErrorTitle>
            {error && (
              <Text type="body" customColor="rgba(255, 255, 255, 0.7)" align="center">
                {error}
              </Text>
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
          </Styled.ErrorContent>
        )}
      </Styled.ContentCard>
    </Styled.PageContainer>
  );
}
