'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import {
  authSelectors,
  userSelectors,
  getActiveTicketsThunk,
  getHistoryTicketsThunk,
  getFavoritesThunk,
} from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProfileTabProvider, useProfileTab } from '@/contexts/ProfileTabContext';
import Text from '@/components/Text';
import Button from '@/components/Button';
import TicketCard from '@/components/TicketCard';
import FavoriteCard from '@/components/FavoriteCard';
import Pagination from '@/components/Pagination';
import { ProfileLayout } from './components';
import { getEmptyStates } from './consts';
import * as Styled from './styled';

function ProfileContent() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(authSelectors.user);
  const activeTickets = useAppSelector(userSelectors.activeTickets);
  const historyTickets = useAppSelector(userSelectors.historyTickets);
  const favorites = useAppSelector(userSelectors.favorites);
  const isLoading = useAppSelector(userSelectors.isLoading);
  const { activeTab, setActiveTab } = useProfileTab();

  // Read tab from URL query parameter on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['personal', 'tickets', 'favorite', 'history'].includes(tabParam)) {
      setActiveTab(tabParam as 'personal' | 'tickets' | 'favorite' | 'history');
    }
  }, [searchParams, setActiveTab]);

  // Pagination state for each tab
  const [activeTicketsPage, setActiveTicketsPage] = useState(1);
  const [historyTicketsPage, setHistoryTicketsPage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const itemsPerPage = 3;

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

  const emptyStates = getEmptyStates(t);

  // Pagination logic
  const getCurrentPageData = (data: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (dataLength: number) => {
    return Math.ceil(dataLength / itemsPerPage);
  };

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
    <ProfileLayout activeTab={activeTab}>
      {activeTab === 'personal' && (
        <>
          <Styled.Header>
            <Text type="h1" color="white">
              {user?.first_name || 'Name'} {user?.last_name || 'Surname'}
            </Text>
            <Button
              variant="secondary"
              size="small"
              onClick={() => router.push(`/${locale}/profile/edit`)}
            >
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
                const fullData =
                  activeTab === 'tickets'
                    ? activeTickets
                    : activeTab === 'favorite'
                      ? favorites
                      : historyTickets;

                const currentPage =
                  activeTab === 'tickets'
                    ? activeTicketsPage
                    : activeTab === 'favorite'
                      ? favoritesPage
                      : historyTicketsPage;

                const data = getCurrentPageData(fullData, currentPage);
                const totalPages = getTotalPages(fullData.length);

                const handlePageChange =
                  activeTab === 'tickets'
                    ? handleActiveTicketsPageChange
                    : activeTab === 'favorite'
                      ? handleFavoritesPageChange
                      : handleHistoryTicketsPageChange;

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
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                              stroke="url(#paint0_linear_search)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 21L16.65 16.65"
                              stroke="url(#paint1_linear_search)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_search"
                                x1="3"
                                y1="3"
                                x2="19"
                                y2="19"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#FE7F3B" />
                                <stop offset="1" stopColor="#FEB245" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_search"
                                x1="16.65"
                                y1="16.65"
                                x2="21"
                                y2="21"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#FE7F3B" />
                                <stop offset="1" stopColor="#FEB245" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </Styled.SearchIcon>
                        <Styled.SearchInput type="text" placeholder={t('common.search')} />
                      </Styled.SearchContainer>
                    )}
                    {activeTab === 'tickets' || activeTab === 'history' ? (
                      <Styled.TicketsList>
                        {data.map((booking: any) => (
                          <TicketCard
                            key={booking.booking_id}
                            booking={booking}
                            onMenuClick={(id) => console.log('Menu clicked for booking:', id)}
                            source={activeTab as 'tickets' | 'history'}
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
                            onClick={(id) =>
                              router.push(`/${locale}/detail/${favorite.category}/${id}`)
                            }
                          />
                        ))}
                      </Styled.FavoritesList>
                    )}

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
    </ProfileLayout>
  );
}

export default function ProfilePage() {
  return (
    <ProfileTabProvider>
      <ProfileContent />
    </ProfileTabProvider>
  );
}
