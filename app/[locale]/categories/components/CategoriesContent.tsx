import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { ICategorySwitch } from '@/types/categories';
import {
  getCompaniesThunk,
  getServicesThunk,
  companiesSelectors,
  servicesSelectors,
  companiesActions,
  servicesActions,
} from '@/store';
import { isRentalCategory } from '@/consts/categoryTemplates';
import Text from '@/components/Text';
import Spinner from '@/components/Spinner';
import CompanyServiceCard from '@/components/CompanyServiceCard';
import ServiceCard from '@/components/ServiceCard';
import Pagination from '@/components/Pagination';
import { useIsMobile, useInfiniteScroll, usePageCache } from '@/hooks';
import { transformFiltersForAPI } from '@/utils/filters';
import * as Styled from '../styled';

interface ICategoriesContentProps {
  selectedCategory: string | null;
  showCompanies: boolean;
  searchTerm: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  categorySwitch: ICategorySwitch;
  sortOption?: string;
  filters?: Record<string, any>;
}

export const CategoriesContent: React.FC<ICategoriesContentProps> = ({
  selectedCategory,
  showCompanies,
  searchTerm,
  currentPage,
  onPageChange,
  categorySwitch,
  sortOption,
  filters,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const isRental = isRentalCategory(selectedCategory || '');

  // Mobile "Load More" accumulated data state
  const [accumulatedData, setAccumulatedData] = useState<any[]>([]);
  const [mobileCurrentPage, setMobileCurrentPage] = useState(1);

  // Page cache — auto-clears when key params change
  const cacheKey = `${selectedCategory}-${showCompanies}-${searchTerm}-${JSON.stringify(filters)}`;
  const pageCache = usePageCache(cacheKey);

  // Companies selectors
  const companies = useAppSelector(companiesSelectors.companies);
  const isLoadingCompanies = useAppSelector(companiesSelectors.isLoading);
  const companiesError = useAppSelector(companiesSelectors.error);
  const companiesTotalPages = useAppSelector(companiesSelectors.totalPages);

  // Services selectors
  const services = useAppSelector(servicesSelectors.services);
  const isLoadingServices = useAppSelector(servicesSelectors.isLoading);
  const servicesError = useAppSelector(servicesSelectors.error);
  const servicesTotalPages = useAppSelector(servicesSelectors.totalPages);

  // Reset accumulated data when category, toggle, search, or filters change
  useEffect(() => {
    setAccumulatedData([]);
    setMobileCurrentPage(1);
  }, [selectedCategory, showCompanies, searchTerm, filters]);

  // Fetch data when dependencies change (debounced to handle rapid toggling)
  useEffect(() => {
    if (!selectedCategory) return;

    const pageToFetch = isMobile ? mobileCurrentPage : currentPage;

    // Use cached data if available (desktop only)
    const cached = !isMobile ? pageCache.get(pageToFetch) : null;
    if (cached) {
      if (showCompanies) {
        dispatch(companiesActions.setCompanies(cached.data));
        dispatch(companiesActions.setCurrentPage(pageToFetch));
        dispatch(companiesActions.setTotalPages(cached.totalPages));
      } else {
        dispatch(servicesActions.setServices(cached.data));
        dispatch(servicesActions.setCurrentPage(pageToFetch));
        dispatch(servicesActions.setTotalPages(cached.totalPages));
      }
      return;
    }

    const params: any = {
      category: selectedCategory,
      search: searchTerm,
      page: pageToFetch,
      per_page: 10,
      filters: transformFiltersForAPI(filters as Record<string, string>, showCompanies),
    };

    if (showCompanies) {
      dispatch(getCompaniesThunk(params));
    } else {
      dispatch(getServicesThunk(params));
    }
  }, [selectedCategory, showCompanies, searchTerm, currentPage, mobileCurrentPage, filters, dispatch, isMobile]);

  // Cache page data after Redux state updates from a successful fetch
  useEffect(() => {
    if (isMobile) return;
    const data = showCompanies ? companies : services;
    const total = showCompanies ? companiesTotalPages : servicesTotalPages;
    const isLoading = showCompanies ? isLoadingCompanies : isLoadingServices;
    if (!isLoading && data.length > 0 && total > 0) {
      pageCache.set(currentPage, data, total);
    }
  }, [companies, services, companiesTotalPages, servicesTotalPages, isLoadingCompanies, isLoadingServices, currentPage, showCompanies, isMobile]);

  // Accumulate data for mobile "Load More" mode
  useEffect(() => {
    if (!isMobile) return;
    
    const newData = showCompanies ? companies : services;
    if (newData.length === 0) return;

    if (mobileCurrentPage === 1) {
      setAccumulatedData(newData);
    } else {
      setAccumulatedData(prev => {
        // Avoid duplicates by checking IDs
        const existingIds = new Set(prev.map(item => item.id));
        const uniqueNewData = newData.filter((item: any) => !existingIds.has(item.id));
        return [...prev, ...uniqueNewData];
      });
    }
  }, [companies, services, showCompanies, isMobile, mobileCurrentPage]);

  // Handle "Load More" - used by infinite scroll
  const handleLoadMore = useCallback(() => {
    setMobileCurrentPage(prev => prev + 1);
  }, []);

  // Infinite scroll with debounce for mobile (using reusable hook)
  const currentTotalPages = showCompanies ? companiesTotalPages : servicesTotalPages;
  const currentIsLoading = showCompanies ? isLoadingCompanies : isLoadingServices;
  
  const { sentinelRef } = useInfiniteScroll({
    enabled: isMobile,
    isLoading: currentIsLoading,
    hasMore: mobileCurrentPage < currentTotalPages,
    onLoadMore: handleLoadMore,
    threshold: 200,
    debounceMs: 150,
  });

  // Apply frontend sorting to the data
  const sortData = useCallback((data: any[]) => {
    if (!sortOption || sortOption === 'recommended') {
      return data; // No sorting for recommended
    }

    const sortedData = [...data];

    switch (sortOption) {
      case 'newest':
        // Sort by created_at or id (descending)
        return sortedData.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : a.id;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : b.id;
          return dateB - dateA;
        });

      case 'a-z':
        // Sort by name (ascending)
        return sortedData.sort((a, b) => {
          const nameA = a.name?.toLowerCase() || '';
          const nameB = b.name?.toLowerCase() || '';
          return nameA.localeCompare(nameB);
        });

      case 'z-a':
        // Sort by name (descending)
        return sortedData.sort((a, b) => {
          const nameA = a.name?.toLowerCase() || '';
          const nameB = b.name?.toLowerCase() || '';
          return nameB.localeCompare(nameA);
        });

      default:
        return sortedData;
    }
  }, [sortOption]);

  // Computed values with frontend sorting applied
  const currentData = useMemo(() => {
    // On mobile, use accumulated data; on desktop, use current page data
    const data = isMobile ? accumulatedData : (showCompanies ? companies : services);
    return sortData(data);
  }, [showCompanies, companies, services, sortData, isMobile, accumulatedData]);

  const isLoading = useMemo(
    () => (showCompanies ? isLoadingCompanies : isLoadingServices),
    [showCompanies, isLoadingCompanies, isLoadingServices]
  );

  // Only show full loading state for initial load, not for "Load More"
  const isInitialLoading = isLoading && (isMobile ? accumulatedData.length === 0 : true);
  const isLoadingMore = isLoading && isMobile && accumulatedData.length > 0;

  const error = useMemo(
    () => (showCompanies ? companiesError : servicesError),
    [showCompanies, companiesError, servicesError]
  );

  const totalPages = useMemo(
    () => (showCompanies ? companiesTotalPages : servicesTotalPages),
    [showCompanies, companiesTotalPages, servicesTotalPages]
  );

  // Show full loading only for initial load (not "Load More")
  if (isInitialLoading && !isMobile) {
    return (
      <Styled.LoadingContainer>
        <div className="spinner" />
        <Text type="body" color="white">
          {t('common.loading')}
        </Text>
      </Styled.LoadingContainer>
    );
  }

  // For mobile initial load (no accumulated data yet)
  if (isLoading && isMobile && accumulatedData.length === 0) {
    return (
      <Styled.LoadingContainer>
        <div className="spinner" />
        <Text type="body" color="white">
          {t('common.loading')}
        </Text>
      </Styled.LoadingContainer>
    );
  }

  if (error) {
    return (
      <Styled.EmptyState>
        <Text type="h2" color="accentRed">
          {t('common.error')}
        </Text>
        <Text type="body" color="white">
          {error}
        </Text>
      </Styled.EmptyState>
    );
  }

  if (currentData.length === 0) {
    return (
      <Styled.EmptyState>
        <Text type="h2" color="white">
          {showCompanies
            ? t('categories.noCompanies')
            : t('categories.noServices')}
        </Text>
        <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
          {showCompanies
            ? t('categories.noCompaniesDescription')
            : t('categories.noServicesDescription')}
        </Text>
      </Styled.EmptyState>
    );
  }

  return (
    <>
      <Styled.CardsGrid>
        {currentData.map((item: any) =>
          !showCompanies && !isRental ? (
            <ServiceCard
              key={item.id}
              id={item.id}
              name={item.name}
              onBook={(serviceId) => {
                router.push(`/${locale}/booking/${selectedCategory}/0?serviceId=${serviceId}`);
              }}
            />
          ) : (
            <CompanyServiceCard
              key={item.id}
              data={item}
              category={selectedCategory || ''}
            />
          )
        )}
      </Styled.CardsGrid>

      {isMobile ? (
        // Mobile: Infinite scroll with loading indicator
        <>
          {/* Sentinel for infinite scroll detection */}
          <div ref={sentinelRef} style={{ height: 1 }} />
          
          {isLoadingMore && (
            <Styled.LoadMoreContainer>
              <Spinner size="medium" />
            </Styled.LoadMoreContainer>
          )}
        </>
      ) : (
        // Desktop: Pagination
        totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )
      )}
    </>
  );
};

