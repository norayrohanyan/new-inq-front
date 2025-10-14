'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { COLORS } from '@/consts/colors';
import {
  PageContainer,
  ContentCard,
  Title,
  Form,
  Input,
  Button,
  ErrorText,
  SuccessText,
  Label,
} from './styled';

export default function PasswordResetPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Extract token from URL (passed from link verification with status 201)
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Invalid password reset link');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!token) {
      setError('Invalid reset token');
      return;
    }

    setIsLoading(true);

    try {
      // Call your password reset API here
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password/reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && !error) {
    return (
      <PageContainer>
        <ContentCard>
          <Title>Loading...</Title>
        </ContentCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentCard>
        <Title>Reset Password</Title>

        {success ? (
          <SuccessText>
            Password reset successful! Redirecting to login...
          </SuccessText>
        ) : (
          <Form onSubmit={handleSubmit}>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                disabled={isLoading}
                required
                minLength={8}
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={isLoading}
                required
                minLength={8}
              />
            </div>

            {error && <ErrorText>{error}</ErrorText>}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Form>
        )}
      </ContentCard>
    </PageContainer>
  );
}

