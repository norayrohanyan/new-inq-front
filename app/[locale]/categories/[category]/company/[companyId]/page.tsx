'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  getCompanyDetailsThunk,
  getCompanyServicesThunk,
  getCompanyReviewsThunk,
  companyDetailsSelectors,
} from '@/store';
import Text from '@/components/Text';
import RentalItemCard from '@/components/RentalItemCard';
import CompanyInfo from '@/components/CompanyInfo';
import CompanyTabs from '@/components/CompanyTabs';
import Pagination from '@/components/Pagination';
import ReviewCard, { ReviewsGrid } from '@/components/ReviewCard';
import * as ParentStyled from '../../../styled';
import * as Styled from './styled';

export default function CompanyInventoryPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const category = params.category as string;
  const companyId = Number(params.companyId);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('items');
  const [reviewsPage, setReviewsPage] = useState<number>(1);

  // Redux selectors
  const companyDetails = useAppSelector(companyDetailsSelectors.companyDetails);
  const services = useAppSelector(companyDetailsSelectors.services); // For rental categories, this returns cars/apartments
  const reviews = useAppSelector(companyDetailsSelectors.reviews);
  const reviewsPagination = useAppSelector(companyDetailsSelectors.reviewsPagination);
  const isLoading = useAppSelector(companyDetailsSelectors.isLoading);
  const isLoadingReviews = useAppSelector(companyDetailsSelectors.isLoadingReviews);

  // Fetch company details and services (which returns cars/apartments for rental categories)
  useEffect(() => {
    if (!companyId || !category) return;

    dispatch(getCompanyDetailsThunk({ category, id: companyId }));
    dispatch(getCompanyServicesThunk({ category, id: companyId }));
  }, [category, companyId, dispatch]);

  // Fetch reviews when reviews tab is active
  useEffect(() => {
    if (!companyId || !category || activeTab !== 'reviews') return;

    dispatch(getCompanyReviewsThunk({ category, id: companyId, page: reviewsPage, perPage: 10 }));
  }, [category, companyId, activeTab, reviewsPage, dispatch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const getCategoryLabel = () => {
    if (category === 'apartment_rental') return t('categories.apartments');
    if (category === 'car_rental') return t('categories.cars');
    return t('categories.items');
  };

  // Define tabs
  const tabs = [
    {
      id: 'items',
      label: getCategoryLabel(),
    },
    {
      id: 'reviews',
      label: 'Reviews',
    },
  ];

  // Filter services by search term (client-side filtering)
  const filteredServices = services?.filter((item: any) => {
    if (!searchTerm) return true;
    return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  if (isLoading && !companyDetails) {
    return (
      <ParentStyled.PageContainer>
        <ParentStyled.LoadingContainer>
          <div className="spinner" />
          <Text type="h4" color="white">
            {t('common.loading')}
          </Text>
        </ParentStyled.LoadingContainer>
      </ParentStyled.PageContainer>
    );
  }

  return (
    <ParentStyled.PageContainer>
      {/* Company Header */}
      <ParentStyled.BannerSection>
        <ParentStyled.Banner>
          <Styled.BannerContent>
            <Text type="h1" color="white">
              {companyDetails?.name || 'Company'}
            </Text>
            <Styled.BannerSubtitle>
              <Text type="body" color="white">
                {getCategoryLabel()}
              </Text>
            </Styled.BannerSubtitle>
          </Styled.BannerContent>
        </ParentStyled.Banner>
      </ParentStyled.BannerSection>

      {/* Main Content with 2 columns */}
      <Styled.MainContentWrapper>
        {/* Left Column - Tabs with Items List */}
        <Styled.LeftColumn>
          <CompanyTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === 'items' && (
              <>
                {/* Search Section */}
                <Styled.SearchSection>
                  <ParentStyled.SearchWrapper>
                    <ParentStyled.SearchIcon>🔍</ParentStyled.SearchIcon>
                    <ParentStyled.SearchInput
                      type="text"
                      placeholder={t('common.search')}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </ParentStyled.SearchWrapper>
                </Styled.SearchSection>

                {/* Items List */}
                {isLoading ? (
                  <ParentStyled.LoadingContainer>
                    <div className="spinner" />
                    <Text type="body" color="white">
                      {t('common.loading')}
                    </Text>
                  </ParentStyled.LoadingContainer>
                ) : filteredServices.length > 0 ? (
                  <Styled.ItemsList>
                    {filteredServices.map((item: any) => (
                      <RentalItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        rating={item.rating?.toString() || '0.0'}
                        address={item.address || ''}
                        totalSquare={item.total_square}
                        bedrooms={item.bedrooms}
                        price={item.price || 0}
                        totalPrice={item.total_price || item.price || 0}
                        currency={item.currency || 'AMD'}
                        imageUrls={item.image_urls || []}
                        category={category}
                      />
                    ))}
                  </Styled.ItemsList>
                ) : (
                  <ParentStyled.EmptyState>
                    <Text type="h2" color="white">
                      No items found
                    </Text>
                    <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
                      This company currently has no {category === 'car_rental' ? 'cars' : 'apartments'} listed.
                    </Text>
                  </ParentStyled.EmptyState>
                )}
              </>
            )}

            {activeTab === 'reviews' && (
              <>
                {isLoadingReviews ? (
                  <ParentStyled.LoadingContainer>
                    <div className="spinner" />
                    <Text type="body" color="white">
                      {t('common.loading')}
                    </Text>
                  </ParentStyled.LoadingContainer>
                ) : reviews.length > 0 ? (
                  <>
                    <ReviewsGrid>
                      {reviews.map((review) => (
                        <ReviewCard
                          key={review.id}
                          userName={review.user_name}
                          rating={review.rating}
                          comment={review.comment}
                        />
                      ))}
                    </ReviewsGrid>
                    {reviewsPagination && reviewsPagination.last_page > 1 && (
                      <Pagination
                        currentPage={reviewsPagination.current_page}
                        totalPages={reviewsPagination.last_page}
                        onPageChange={(page) => setReviewsPage(page)}
                      />
                    )}
                  </>
                ) : (
                  <ParentStyled.EmptyState>
                    <Text type="h2" color="white">
                      No reviews yet
                    </Text>
                    <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
                      Be the first to review this company!
                    </Text>
                  </ParentStyled.EmptyState>
                )}
              </>
            )}
          </CompanyTabs>
        </Styled.LeftColumn>

        {/* Right Column - Company Info */}
        <Styled.RightColumn>
          {companyDetails && (
            <CompanyInfo
              companyId={companyDetails.id}
              category={category}
              logo={companyDetails.logo || ''}
              name={companyDetails.name}
              rating={companyDetails.rating?.toString() || '0.0'}
              address={companyDetails.address || ''}
              description={companyDetails.description || ''}
              phones={companyDetails.phones || []}
              workHours={
                typeof companyDetails.work_hours === 'object' &&
                companyDetails.work_hours !== null &&
                !Array.isArray(companyDetails.work_hours)
                  ? (companyDetails.work_hours as {
                      Sunday: string | string[] | null;
                      Monday: string | string[] | null;
                      Tuesday: string | string[] | null;
                      Wednesday: string | string[] | null;
                      Thursday: string | string[] | null;
                      Friday: string | string[] | null;
                      Saturday: string | string[] | null;
                    })
                  : {
                      Sunday: null,
                      Monday: null,
                      Tuesday: null,
                      Wednesday: null,
                      Thursday: null,
                      Friday: null,
                      Saturday: null,
                    }
              }
              externalLinks={
                Array.isArray(companyDetails.external_links) 
                  ? {} 
                  : (companyDetails.external_links as Record<string, string> | undefined)
              }
            />
          )}
        </Styled.RightColumn>
      </Styled.MainContentWrapper>
    </ParentStyled.PageContainer>
  );
}
