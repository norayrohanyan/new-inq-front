'use client';

import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import {
  authSelectors,
  authActions,
  userSelectors,
  getActiveTicketsThunk,
  getHistoryTicketsThunk,
  getFavoritesThunk,
} from '@/store';
import { useRouter } from 'next/navigation';
import { ProfileTabProvider, useProfileTab } from '@/contexts/ProfileTabContext';
import { apiService } from '@/services/api';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { LogoutIcon } from '@/components/icons';
import { getMenuItems, getEmptyStates } from './consts';
import * as Styled from './styled';

function ProfileContent() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(authSelectors.user);
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  const activeTickets = useAppSelector(userSelectors.activeTickets);
  const historyTickets = useAppSelector(userSelectors.historyTickets);
  const favorites = useAppSelector(userSelectors.favorites);
  const isLoading = useAppSelector(userSelectors.isLoading);
  const { activeTab, setActiveTab } = useProfileTab();

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'tickets') {
      dispatch(getActiveTicketsThunk({ page: 1 }));
    } else if (activeTab === 'history') {
      dispatch(getHistoryTicketsThunk({ page: 1 }));
    } else if (activeTab === 'favorite') {
      dispatch(getFavoritesThunk());
    }
  }, [activeTab, dispatch]);

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

  const menuItems = getMenuItems(t);
  const emptyStates = getEmptyStates(t);

  return (
    <Styled.PageContainer>
      <Styled.ContentWrapper>
        <Styled.Sidebar>
          <Styled.MenuList>
            {menuItems.map((item) => (
              <Styled.MenuItem
                key={item.id}
                $active={activeTab === item.id}
                onClick={() => setActiveTab(item.id as 'personal' | 'tickets' | 'favorite' | 'history')}
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

        <Styled.MainContent>
          {activeTab === 'personal' && (
            <>
              <Styled.Header>
                <Text type="h1" color="white">
                  {user?.first_name || 'Name'} {user?.last_name || 'Surname'}
                </Text>
                <Button variant="secondary" size="small">
                  {t('common.edit')}
                </Button>
              </Styled.Header>

              <Styled.InfoSection>
                <Styled.InfoItem>
                  <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
                    {t('profile.phoneNumber')}
                  </Text>
                  <Text type="body" color="white" fontWeight="500">
                    {user?.phone || '+374 12345678'}
                  </Text>
                </Styled.InfoItem>

                <Styled.InfoItem>
                  <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
                    {t('profile.email')}
                  </Text>
                  <Text type="body" color="white" fontWeight="500">
                    {user?.email || 'name.surname@gmail.com'}
                  </Text>
                </Styled.InfoItem>

                <Styled.InfoItem>
                  <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
                    {t('profile.password')}
                  </Text>
                  <Text type="body" color="white" fontWeight="500">
                    ••••••••••••••
                  </Text>
                </Styled.InfoItem>
              </Styled.InfoSection>
            </>
          )}

          {(activeTab === 'tickets' || activeTab === 'favorite' || activeTab === 'history') && (
            <>
              {isLoading ? (
                <Styled.EmptyState>
                  <Text type="body" color="white">
                    {t('common.loading')}
                  </Text>
                </Styled.EmptyState>
              ) : (
                <>
                  {(() => {
                    const data = 
                      activeTab === 'tickets' ? activeTickets :
                      activeTab === 'favorite' ? favorites :
                      historyTickets;
                    
                    return data.length > 0 ? (
                      <div>
                        <Text type="h2" color="white">
                          {activeTab === 'tickets' && `Active Tickets: ${data.length}`}
                          {activeTab === 'favorite' && `Favorites: ${data.length}`}
                          {activeTab === 'history' && `History: ${data.length}`}
                        </Text>
                        {/* TODO: Display list */}
                      </div>
                    ) : (
                      <Styled.EmptyState>
                        {emptyStates[activeTab].icon}
                        <Text type="h3" color="white" align="center">
                          {emptyStates[activeTab].title}
                        </Text>
                        <Text type="body" customColor="rgba(255, 255, 255, 0.6)" align="center">
                          {emptyStates[activeTab].description}
                        </Text>
                      </Styled.EmptyState>
                    );
                  })()}
                </>
              )}
            </>
          )}
        </Styled.MainContent>
      </Styled.ContentWrapper>
    </Styled.PageContainer>
  );
}

export default function ProfilePage() {
  return (
    <ProfileTabProvider>
      <ProfileContent />
    </ProfileTabProvider>
  );
}
