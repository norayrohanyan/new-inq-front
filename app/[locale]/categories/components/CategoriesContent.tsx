import React, { useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
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
import Text from '@/components/Text';
import CompanyServiceCard from '@/components/CompanyServiceCard';
import Pagination from '@/components/Pagination';
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
  const dispatch = useAppDispatch();

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

  // Fetch data when dependencies change (filters only, not sort)
  useEffect(() => {
    if (!selectedCategory) return;

    const params: any = {
      category: selectedCategory,
      search: searchTerm,
      page: currentPage,
      per_page: 10,
      filters: filters, // Only backend filters trigger API call
    };

    if (showCompanies) {
      dispatch(getCompaniesThunk(params));
    } else {
      dispatch(getServicesThunk(params));
    }
  }, [selectedCategory, showCompanies, searchTerm, currentPage, filters, dispatch]); // sortOption removed from dependencies

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
    const data = showCompanies ? companies : services;
    return sortData(data);
  }, [showCompanies, companies, services, sortData]);

  const isLoading = useMemo(
    () => (showCompanies ? isLoadingCompanies : isLoadingServices),
    [showCompanies, isLoadingCompanies, isLoadingServices]
  );

  const error = useMemo(
    () => (showCompanies ? companiesError : servicesError),
    [showCompanies, companiesError, servicesError]
  );

  const totalPages = useMemo(
    () => (showCompanies ? companiesTotalPages : servicesTotalPages),
    [showCompanies, companiesTotalPages, servicesTotalPages]
  );

  if (isLoading) {
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
        {currentData.map((item: any) => (
          <CompanyServiceCard 
            key={item.id} 
            data={item} 
            category={selectedCategory || ''} 
          />
        ))}
      </Styled.CardsGrid>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

