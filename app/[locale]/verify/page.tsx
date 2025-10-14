'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authSelectors, verifyLinkThunk } from '@/store';
import * as Styled from './styled';

export default function VerifyPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLoading = useAppSelector(authSelectors.isLoading);

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
        const data = result.payload;
        setStatus('success');
        setMessage('Verification successful! Redirecting...');

        // Wait a moment before redirecting
        setTimeout(() => {
          if (data?.redirect_url) {
            // If there's a redirect URL, use it
            window.location.href = data.redirect_url;
          } else {
            // Otherwise redirect to home
            router.push('/');
          }
        }, 1500);
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

  return (
    <Styled.PageContainer>
      <Styled.ContentCard>
        <Styled.Title>Link Verification</Styled.Title>

        {status === 'loading' && (
          <>
            <Styled.LoadingSpinner />
            <Styled.Message>{message}</Styled.Message>
          </>
        )}

        {status === 'success' && (
          <Styled.Message $success>{message}</Styled.Message>
        )}

        {status === 'error' && (
          <>
            <Styled.ErrorText>{errorMessage}</Styled.ErrorText>
            <Styled.Message>
              <a href="/">Return to home</a>
            </Styled.Message>
          </>
        )}
      </Styled.ContentCard>
    </Styled.PageContainer>
  );
}

