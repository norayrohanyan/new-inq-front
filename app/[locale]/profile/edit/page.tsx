'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { authSelectors, authActions, getCurrentUserThunk } from '@/store';
import { apiService } from '@/services/api';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import ModalDialog from '@/components/Modal/ModalDialog';
import {
  PhoneIcon,
  LockIcon,
  SuccessIcon,
  ErrorIcon,
  SmsIcon,
} from '@/components/icons';
import { ProfileLayout } from '../components';
import { getLocalNumber } from '@/utils/phone';
import * as Styled from './styled';

export default function ProfileEditPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(authSelectors.user);
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);

  // Profile form state
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [profileLoading, setProfileLoading] = useState(false);

  // Phone form state
  const [phone, setPhone] = useState(user?.phone || '');
  const [phoneLoading, setPhoneLoading] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPasswordChangeSuccess, setIsPasswordChangeSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSmsModal, setShowSmsModal] = useState(false);

  // Fetch user data from server when authenticated but user data not loaded
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getCurrentUserThunk());
    }
  }, [isAuthenticated, user, dispatch]);

  // Update form fields when user data changes
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setPhone(getLocalNumber(user.phone));
    }
  }, [user]);

  // Handle phone input - only allow digits, max 8
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '');
    digits = digits.replace(/^0+/, ''); // Remove leading zeros
    digits = digits.slice(0, 8); // Max 8 digits
    setPhone(digits);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      const response = await apiService.editProfile({
        first_name: firstName,
        last_name: lastName,
      });

      if (response.success) {
        dispatch(authActions.updateUser({ first_name: firstName, last_name: lastName }));
        setSuccessMessage(t('profile.edit.profileUpdated'));
        setShowSuccessModal(true);
      } else {
        setErrorMessage(response.error || t('common.error'));
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage(t('common.error'));
      setShowErrorModal(true);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneLoading(true);

    try {
      const response = await apiService.updatePhone(phone);

      if (response.success) {
        dispatch(authActions.updateUser({ phone }));
        setShowSmsModal(true);
      } else {
        setErrorMessage(response.error || t('common.error'));
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage(t('common.error'));
      setShowErrorModal(true);
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleSuccessModalClose = async () => {
    if (isPasswordChangeSuccess) {
      // Password was changed successfully, log out the user
      try {
        await apiService.logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        dispatch(authActions.logout());
        setShowSuccessModal(false);
        setIsPasswordChangeSuccess(false);
        router.push(`/${locale}/login`);
      }
    } else {
      // Regular success (profile or phone update)
      setShowSuccessModal(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);

    if (newPassword !== confirmPassword) {
      setErrorMessage(t('profile.edit.passwordsDoNotMatch'));
      setShowErrorModal(true);
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage(t('profile.edit.passwordTooShort'));
      setShowErrorModal(true);
      setPasswordLoading(false);
      return;
    }

    try {
      const response = await apiService.updateUserPassword({
        password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (response.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setSuccessMessage(t('profile.edit.passwordUpdated'));
        setIsPasswordChangeSuccess(true);
        setShowSuccessModal(true);
      } else {
        setErrorMessage(response.error || t('common.error'));
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage(t('common.error'));
      setShowErrorModal(true);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <ProfileLayout>
      <Styled.CardsContainer>
        {/* Edit Profile Card */}
        <Styled.EditCard>
          <Text type="h2" color="white" align="center">
            {t('profile.edit.editProfile')}
          </Text>
          <Styled.EditForm onSubmit={handleProfileSubmit}>
            <Styled.InputRow>
              <Input
                type="text"
                placeholder={t('profile.edit.name')}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder={t('profile.edit.surname')}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Styled.InputRow>
            <Button
              variant="primary"
              size="medium"
              fullWidth
              type="submit"
              isLoading={profileLoading}
            >
              {t('common.submit')}
            </Button>
          </Styled.EditForm>
        </Styled.EditCard>

        {/* Edit Phone Card */}
        <Styled.EditCard>
          <Text type="h2" color="white" align="center">
            {t('profile.edit.editPhone')}
          </Text>
          <Styled.EditForm onSubmit={handlePhoneSubmit}>
            <Styled.PhoneInputWrapper>
              <Styled.PhoneIconWrapper>
                <PhoneIcon width="20" height="20" />
              </Styled.PhoneIconWrapper>
              <Styled.PhonePrefix>+374</Styled.PhonePrefix>
              <Styled.PhoneInput
                type="tel"
                placeholder="XX XXX XXX"
                value={phone}
                onChange={handlePhoneChange}
                inputMode="numeric"
                required
              />
            </Styled.PhoneInputWrapper>
            <Button
              variant="primary"
              size="medium"
              fullWidth
              type="submit"
              isLoading={phoneLoading}
            >
              {t('common.submit')}
            </Button>
          </Styled.EditForm>
        </Styled.EditCard>

        {/* Edit Password Card */}
        <Styled.EditCard>
          <Text type="h2" color="white" align="center">
            {t('profile.edit.editPassword')}
          </Text>
          <Styled.EditForm onSubmit={handlePasswordSubmit}>
            <Input
              type="password"
              placeholder={t('profile.edit.currentPassword')}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              icon={<LockIcon width="20" height="20" />}
              required
            />
            <Input
              type="password"
              placeholder={t('profile.edit.newPassword')}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              icon={<LockIcon width="20" height="20" />}
              required
            />
            <Input
              type="password"
              placeholder={t('profile.edit.confirmPassword')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<LockIcon width="20" height="20" />}
              required
            />
            <Button
              variant="primary"
              size="medium"
              fullWidth
              type="submit"
              isLoading={passwordLoading}
            >
              {t('common.submit')}
            </Button>
          </Styled.EditForm>
        </Styled.EditCard>
      </Styled.CardsContainer>

      {/* Success Modal */}
      <ModalDialog
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        icon={<SuccessIcon width={80} height={80} />}
        title={successMessage}
        type="success"
        buttons={
          <Button
            variant="primary"
            onClick={handleSuccessModalClose}
            fullWidth
          >
            {t('common.ok') || 'OK'}
          </Button>
        }
      />

      {/* Error Modal */}
      <ModalDialog
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        icon={<ErrorIcon width={80} height={80} />}
        title={errorMessage}
        type="error"
        buttons={
          <Button
            variant="primary"
            onClick={() => setShowErrorModal(false)}
            fullWidth
          >
            {t('common.ok') || 'OK'}
          </Button>
        }
      />

      {/* SMS Verification Modal */}
      <ModalDialog
        isOpen={showSmsModal}
        onClose={() => setShowSmsModal(false)}
        icon={<SmsIcon />}
        title={t('auth.checkYourSms')}
      />
    </ProfileLayout>
  );
}
