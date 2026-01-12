'use client';

import { ReactNode } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAppDispatch } from '@/lib/hooks';
import { authActions } from '@/store';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import Text from '@/components/Text';
import { LogoutIcon } from '@/components/icons';
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

  const menuItems = getMenuItems(t);

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(authActions.logout());
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

          <Styled.LogoutButton onClick={handleLogout}>
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
    </Styled.PageContainer>
  );
}

