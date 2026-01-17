'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import * as Styled from '../../../styled';
import styled from 'styled-components';

export default function CompanyInventoryPage() {
  const params = useParams();
  const router = useRouter();
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
      <Styled.PageContainer>
        <Styled.LoadingContainer>
          <div className="spinner" />
          <Text type="h4" color="white">
            {t('common.loading')}
          </Text>
        </Styled.LoadingContainer>
      </Styled.PageContainer>
    );
  }

  return (
    <Styled.PageContainer>
      {/* Company Header */}
      <Styled.BannerSection>
        <Styled.Banner>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <Text type="h1" color="white">
              {companyDetails?.name || 'Company'}
            </Text>
            <Text type="body" color="white" style={{ marginTop: '0.5rem' }}>
              {getCategoryLabel()}
            </Text>
          </div>
        </Styled.Banner>
      </Styled.BannerSection>

      {/* Main Content with 2 columns */}
      <MainContentWrapper>
        {/* Left Column - Tabs with Items List */}
        <LeftColumn>
          <CompanyTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === 'items' && (
              <>
                {/* Search Section */}
                <SearchSection>
                  <Styled.SearchWrapper>
                    <Styled.SearchIcon>🔍</Styled.SearchIcon>
                    <Styled.SearchInput
                      type="text"
                      placeholder={t('common.search')}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </Styled.SearchWrapper>
                </SearchSection>

                {/* Items List */}
                {isLoading ? (
                  <Styled.LoadingContainer>
                    <div className="spinner" />
                    <Text type="body" color="white">
                      {t('common.loading')}
                    </Text>
                  </Styled.LoadingContainer>
                ) : filteredServices.length > 0 ? (
                  <ItemsList>
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
                  </ItemsList>
                ) : (
                  <Styled.EmptyState>
                    <Text type="h2" color="white">
                      No items found
                    </Text>
                    <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
                      This company currently has no {category === 'car_rental' ? 'cars' : 'apartments'} listed.
                    </Text>
                  </Styled.EmptyState>
                )}
              </>
            )}

            {activeTab === 'reviews' && (
              <>
                {isLoadingReviews ? (
                  <Styled.LoadingContainer>
                    <div className="spinner" />
                    <Text type="body" color="white">
                      {t('common.loading')}
                    </Text>
                  </Styled.LoadingContainer>
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
                  <Styled.EmptyState>
                    <Text type="h2" color="white">
                      No reviews yet
                    </Text>
                    <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
                      Be the first to review this company!
                    </Text>
                  </Styled.EmptyState>
                )}
              </>
            )}
          </CompanyTabs>
        </LeftColumn>

        {/* Right Column - Company Info */}
        <RightColumn>
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
                typeof companyDetails.work_hours === 'object' && companyDetails.work_hours !== null && !Array.isArray(companyDetails.work_hours)
                  ? (companyDetails.work_hours as {
                      Sunday: string[] | null;
                      Monday: string[] | null;
                      Tuesday: string[] | null;
                      Wednesday: string[] | null;
                      Thursday: string[] | null;
                      Friday: string[] | null;
                      Saturday: string[] | null;
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
        </RightColumn>
      </MainContentWrapper>
    </Styled.PageContainer>
  );
}

// Styled Components for 2-column layout
const MainContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  padding: 0 4rem 2rem 4rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 0 2rem 2rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem 1.5rem 1rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightColumn = styled.div`
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  @media (max-width: 1200px) {
    position: static;
    order: -1; // Show company info first on mobile
  }
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;


