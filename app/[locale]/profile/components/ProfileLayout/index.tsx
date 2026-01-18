'use client';

import { ReactNode, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAppDispatch } from '@/lib/hooks';
import { authActions } from '@/store';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import Text from '@/components/Text';
import { LogoutIcon, WarningIcon } from '@/components/icons';
import ModalDialog from '@/components/Modal/ModalDialog';
import Button from '@/components/Button';
import { getMenuItems } from '../../consts';
import * as Styled from './styled';

interface ProfileLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export default function ProfileLayout({ children, activeTab }: ProfileLayoutProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = getMenuItems(t);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(authActions.logout());
      setIsLogoutModalOpen(false);
      setIsLoggingOut(false);
      router.push(`/${locale}/login`);
    }
  };

  const handleTabChange = (tab: string) => {
    router.push(`/${locale}/profile?tab=${tab}`);
  };

  return (
    <Styled.PageContainer>
      <Styled.ContentWrapper>
        <Styled.Sidebar>
          <Styled.MenuList>
            {menuItems.map((item) => (
              <Styled.MenuItem
                key={item.id}
                $active={activeTab === item.id}
                onClick={() => handleTabChange(item.id)}
              >
                <Styled.MenuIcon $active={activeTab === item.id}>
                  {item.icon}
                </Styled.MenuIcon>
                <Text
                  type="body"
                  color="white"
                  fontWeight={activeTab === item.id ? '600' : '400'}
                >
                  {item.label}
                </Text>
              </Styled.MenuItem>
            ))}
          </Styled.MenuList>

          <Styled.LogoutButton onClick={handleLogoutClick}>
            <Styled.MenuIcon $active={false}>
              <LogoutIcon width="20" height="20" />
            </Styled.MenuIcon>
            <Text type="body" color="white" fontWeight="500">
              {t('profile.logout')}
            </Text>
          </Styled.LogoutButton>
        </Styled.Sidebar>

        <Styled.MainContent>{children}</Styled.MainContent>
      </Styled.ContentWrapper>

      <ModalDialog
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        icon={<WarningIcon />}
        title={t('profile.logoutConfirmTitle')}
        description={t('profile.logoutConfirmDescription')}
        type="warning"
        buttons={
          <>
            <Button
              variant="primary"
              onClick={handleLogoutConfirm}
              isLoading={isLoggingOut}
              fullWidth
            >
              {t('profile.logout')}
            </Button>
          </>
        }
      />
    </Styled.PageContainer>
  );
}

