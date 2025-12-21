'use client';

import { useEffect, useState } from 'react';
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
import TicketCard from '@/components/TicketCard';
import FavoriteCard from '@/components/FavoriteCard';
import Pagination from '@/components/Pagination';
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

  // Pagination state for each tab
  const [activeTicketsPage, setActiveTicketsPage] = useState(1);
  const [historyTicketsPage, setHistoryTicketsPage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const itemsPerPage = 3; // Items to show per page

  // Reset page to 1 when changing tabs
  useEffect(() => {
    setActiveTicketsPage(1);
    setHistoryTicketsPage(1);
    setFavoritesPage(1);
  }, [activeTab]);

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

  // Temporary mock data for testing active tickets
  const mockActiveTickets = [
    {
      booking_id: 101,
      status: 'confirmed',
      total_price: 18000,
      category: 'beauty_salon',
      company_name: 'Luxury Beauty Studio',
      company_phone: '+374 91 111222',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Manicure & Pedicure',
      currency: 'AMD',
      date: '2024-12-05T15:00:00',
    },
    {
      booking_id: 102,
      status: 'pending',
      total_price: 35000,
      category: 'restaurant',
      company_name: 'Fine Dining Restaurant',
      company_phone: '+374 91 222333',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Dinner Reservation',
      currency: 'AMD',
      date: '2024-12-02T20:00:00',
    },
    {
      booking_id: 103,
      status: 'in_process',
      total_price: 7000,
      category: 'car_wash',
      company_name: 'Express Car Wash',
      company_phone: '+374 91 333444',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Interior Cleaning',
      currency: 'AMD',
      date: '2024-12-01T11:30:00',
    },
    {
      booking_id: 104,
      status: 'confirmed',
      total_price: 22000,
      category: 'spa',
      company_name: 'Wellness Spa Center',
      company_phone: '+374 91 444555',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Full Body Massage',
      currency: 'AMD',
      date: '2024-12-07T14:00:00',
    },
    {
      booking_id: 105,
      status: 'pending',
      total_price: 12500,
      category: 'beauty_salon',
      company_name: 'Style Hair Salon',
      company_phone: '+374 91 555666',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Hair Coloring',
      currency: 'AMD',
      date: '2024-12-03T10:30:00',
    },
    {
      booking_id: 106,
      status: 'confirmed',
      total_price: 9500,
      category: 'car_wash',
      company_name: 'Auto Clean Pro',
      company_phone: '+374 91 666777',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Premium Wash',
      currency: 'AMD',
      date: '2024-12-06T09:00:00',
    },
    {
      booking_id: 107,
      status: 'in_process',
      total_price: 28000,
      category: 'restaurant',
      company_name: 'Italian Trattoria',
      company_phone: '+374 91 777888',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Private Dining',
      currency: 'AMD',
      date: '2024-12-04T19:00:00',
    },
  ];

  // Temporary mock data for testing history items
  const mockHistoryTickets = [
    {
      booking_id: 1,
      status: 'completed',
      total_price: 15000,
      category: 'beauty_salon',
      company_name: 'Elegance Beauty Salon',
      company_phone: '+374 91 123456',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Hair Cut & Styling',
      currency: 'AMD',
      date: '2024-11-20T14:30:00',
    },
    {
      booking_id: 2,
      status: 'completed',
      total_price: 8500,
      category: 'car_wash',
      company_name: 'Premium Car Wash',
      company_phone: '+374 91 234567',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Full Car Wash',
      currency: 'AMD',
      date: '2024-11-18T10:00:00',
    },
    {
      booking_id: 3,
      status: 'cancelled',
      total_price: 12000,
      category: 'spa',
      company_name: 'Relaxation Spa Center',
      company_phone: '+374 91 345678',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Massage Therapy',
      currency: 'AMD',
      date: '2024-11-15T16:00:00',
    },
    {
      booking_id: 4,
      status: 'completed',
      total_price: 25000,
      category: 'restaurant',
      company_name: 'Gourmet Restaurant',
      company_phone: '+374 91 456789',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'Table Reservation',
      currency: 'AMD',
      date: '2024-11-10T19:30:00',
    },
    {
      booking_id: 5,
      status: 'completed',
      total_price: 5000,
      category: 'taxi',
      company_name: 'Quick Taxi Service',
      company_phone: '+374 91 567890',
      company_logo: '/images/placeholder-logo.png',
      service_name: 'City Transfer',
      currency: 'AMD',
      date: '2024-11-08T08:15:00',
    },
  ];

  // Use mock data for testing (will show mock data if real data is empty)
  const displayActiveTickets = activeTickets.length > 0 ? activeTickets : mockActiveTickets;
  const displayHistoryTickets = historyTickets.length > 0 ? historyTickets : mockHistoryTickets;

  // Pagination logic
  const getCurrentPageData = (data: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (dataLength: number) => {
    return Math.ceil(dataLength / itemsPerPage);
  };

  // Handler functions for pagination
  const handleActiveTicketsPageChange = (page: number) => {
    setActiveTicketsPage(page);
  };

  const handleHistoryTicketsPageChange = (page: number) => {
    setHistoryTicketsPage(page);
  };

  const handleFavoritesPageChange = (page: number) => {
    setFavoritesPage(page);
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
                    // Get the full data for the current tab
                    const fullData = 
                      activeTab === 'tickets' ? displayActiveTickets :
                      activeTab === 'favorite' ? favorites :
                      displayHistoryTickets;
                    
                    // Get the current page number for the active tab
                    const currentPage = 
                      activeTab === 'tickets' ? activeTicketsPage :
                      activeTab === 'favorite' ? favoritesPage :
                      historyTicketsPage;
                    
                    // Get paginated data
                    const data = getCurrentPageData(fullData, currentPage);
                    
                    // Get total pages
                    const totalPages = getTotalPages(fullData.length);
                    
                    // Get page change handler
                    const handlePageChange = 
                      activeTab === 'tickets' ? handleActiveTicketsPageChange :
                      activeTab === 'favorite' ? handleFavoritesPageChange :
                      handleHistoryTicketsPageChange;
                    
                    return fullData.length > 0 ? (
                      <Styled.TicketsContainer>
                        <Text type="h2" color="white">
                          {activeTab === 'tickets' && `Active Tickets`}
                          {activeTab === 'favorite' && `Favorites`}
                          {activeTab === 'history' && `History`}
                        </Text>
                        {activeTab === 'favorite' && (
                          <Styled.SearchContainer>
                            <Styled.SearchIcon>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="url(#paint0_linear_search)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 21L16.65 16.65" stroke="url(#paint1_linear_search)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <defs>
                                  <linearGradient id="paint0_linear_search" x1="3" y1="3" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FE7F3B"/>
                                    <stop offset="1" stopColor="#FEB245"/>
                                  </linearGradient>
                                  <linearGradient id="paint1_linear_search" x1="16.65" y1="16.65" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FE7F3B"/>
                                    <stop offset="1" stopColor="#FEB245"/>
                                  </linearGradient>
                                </defs>
                              </svg>
                            </Styled.SearchIcon>
                            <Styled.SearchInput
                              type="text"
                              placeholder={t('common.search')}
                            />
                          </Styled.SearchContainer>
                        )}
                        {activeTab === 'tickets' || activeTab === 'history' ? (
                          <Styled.TicketsList>
                            {data.map((booking: any) => (
                              <TicketCard
                                key={booking.booking_id}
                                booking={booking}
                                onMenuClick={(id) => console.log('Menu clicked for booking:', id)}
                              />
                            ))}
                          </Styled.TicketsList>
                        ) : (
                          <Styled.FavoritesList>
                            {data.map((favorite: any) => (
                              <FavoriteCard
                                key={favorite.id}
                                id={favorite.id}
                                category={favorite.category}
                                logo={favorite.logo}
                                name={favorite.name}
                                rating={favorite.rating?.toString() || '0.0'}
                                address={favorite.address || ''}
                                workHours={favorite.work_hours || 'N/A'}
                                phone={favorite.phones?.[0]}
                                onShare={(id) => console.log('Share company:', id)}
                                onClick={(id) => router.push(`/${locale}/detail/${favorite.category}/${id}`)}
                              />
                            ))}
                          </Styled.FavoritesList>
                        )}
                        
                        {/* Pagination - Show only if more than 1 page */}
                        {totalPages > 1 && (
                          <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                          />
                        )}
                      </Styled.TicketsContainer>
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
