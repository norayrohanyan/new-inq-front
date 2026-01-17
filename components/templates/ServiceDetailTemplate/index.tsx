'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Masonry from 'react-responsive-masonry';
import CompanyInfo from '@/components/CompanyInfo';
import CompanyTabs from '@/components/CompanyTabs';
import ServiceCard from '@/components/ServiceCard';
import EmployeeCard from '@/components/EmployeeCard';
import ImageGallery from '@/components/ImageGallery';
import ReviewCard, { ReviewsGrid } from '@/components/ReviewCard';
import Pagination from '@/components/Pagination';
import Text from '@/components/Text';
import * as Styled from './styled';

export interface ServiceDetailData {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  rating: string | number;
  address?: string;
  phones?: string[];
  workHours?: string | Record<string, string[] | null>;
  externalLinks?: Record<string, string> | any[];
  bannerUrls?: {
    desktopImage?: string;
    mobileImage?: string;
  };
  
  // Tab content
  services?: Array<{
    id: number;
    name: string;
    description?: string;
    price: number;
    duration?: string;
  }>;
  
  employees?: Array<{
    id: number;
    name: string;
    profession?: string;
    position?: string;
    rating?: string;
    imageUrl?: string;
    avatar?: string;
  }>;
  
  portfolio?: string[];

  reviews?: Array<{
    id: number;
    rating: number;
    comment: string;
    user_name: string;
  }>;

  reviewsPagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface ServiceDetailTemplateProps {
  data: ServiceDetailData;
  category: string;
  features: {
    hasServices?: boolean;
    hasEmployees?: boolean;
    hasPortfolio?: boolean;
    hasReviews?: boolean;
    hasBookingFlow?: boolean;
  };
  onServiceBook?: (serviceId: number) => void;
  onEmployeeBook?: (employeeId: number) => void;
  onReviewsPageChange?: (page: number) => void;
  isLoading?: boolean;
  isLoadingReviews?: boolean;
}

export default function ServiceDetailTemplate({
  data,
  category,
  features,
  onServiceBook,
  onEmployeeBook,
  onReviewsPageChange,
  isLoading,
  isLoadingReviews,
}: ServiceDetailTemplateProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = React.useState('services');

  // Build tabs array based on available data and features
  const tabs = React.useMemo(() => {
    const tabsList: Array<{ id: string; label: string }> = [];
    
    if (features.hasServices && data.services && data.services.length > 0) {
      tabsList.push({ id: 'services', label: t('company.services') });
    }
    
    if (features.hasEmployees && data.employees && data.employees.length > 0) {
      tabsList.push({ id: 'employees', label: t('company.employees') });
    }
    
    if (features.hasPortfolio && data.portfolio && data.portfolio.length > 0) {
      tabsList.push({ id: 'portfolio', label: t('company.portfolio') });
    }

    if (features.hasReviews) {
      tabsList.push({ id: 'reviews', label: t('company.reviews') });
    }
    
    return tabsList;
  }, [data.services, data.employees, data.portfolio, data.reviews, features, t]);

  // Set default active tab to first available tab
  React.useEffect(() => {
    if (tabs.length > 0 && !tabs.find((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  if (isLoading) {
    return (
      <Styled.PageContainer>
        <Styled.LoadingContainer>
          <Text type="h4" color="white">
            {t('common.loading')}
          </Text>
        </Styled.LoadingContainer>
      </Styled.PageContainer>
    );
  }

  const handleServiceBook = (serviceId: number) => {
    if (onServiceBook) {
      onServiceBook(serviceId);
    } else if (features.hasBookingFlow) {
      // TODO: Navigate to separate booking page
      console.log('Navigate to booking page for service:', serviceId);
    } else {
      console.log('Book service:', serviceId);
    }
  };

  const handleEmployeeBook = (employeeId: number) => {
    if (onEmployeeBook) {
      onEmployeeBook(employeeId);
    } else if (features.hasBookingFlow) {
      // TODO: Navigate to separate booking page
      console.log('Navigate to booking page for employee:', employeeId);
    } else {
      console.log('Book employee:', employeeId);
    }
  };

  return (
    <Styled.PageContainer>
      {/* Banner Section */}
      <Styled.BannerSection>
        {data.bannerUrls?.desktopImage ? (
          <Styled.BannerImage
            src={data.bannerUrls.desktopImage}
            alt={data.name}
          />
        ) : (
          <Styled.BannerPlaceholder>
            <Text type="h3" color="secondarySemiLight">
              {data.name}
            </Text>
          </Styled.BannerPlaceholder>
        )}
      </Styled.BannerSection>

      {/* Main Content - Two Column Layout */}
      <Styled.MainContent>
        {/* Left Column - Tabs Content */}
        {tabs.length > 0 && (
          <Styled.LeftColumn>
            <CompanyTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
              {activeTab === 'services' && data.services && (
                <Masonry 
                  columnsCount={2} 
                  gutter="0.5rem"
                  columnsCountBreakPoints={{ 350: 1, 750: 2 }}
                >
                  {data.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      name={service.name}
                      description={service.description}
                      price={service.price}
                      duration={service.duration}
                      onBook={handleServiceBook}
                    />
                  ))}
                </Masonry>
              )}

              {activeTab === 'employees' && data.employees && (
                <Styled.EmployeesGrid>
                  {data.employees.map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      id={employee.id}
                      name={employee.name}
                      profession={employee.profession || employee.position || ''}
                      rating={employee.rating || '0.0'}
                      imageUrl={employee.imageUrl || employee.avatar}
                      onBook={handleEmployeeBook}
                    />
                  ))}
                </Styled.EmployeesGrid>
              )}

              {activeTab === 'portfolio' && data.portfolio && (
                <Styled.PortfolioSection>
                  <ImageGallery images={data.portfolio} alt={data.name} />
                </Styled.PortfolioSection>
              )}

              {activeTab === 'reviews' && (
                <>
                  {isLoadingReviews ? (
                    <Styled.LoadingContainer>
                      <Text type="body" color="white">
                        {t('common.loading')}
                      </Text>
                    </Styled.LoadingContainer>
                  ) : data.reviews && data.reviews.length > 0 ? (
                    <>
                      <ReviewsGrid>
                        {data.reviews.map((review) => (
                          <ReviewCard
                            key={review.id}
                            userName={review.user_name}
                            rating={review.rating}
                            comment={review.comment}
                          />
                        ))}
                      </ReviewsGrid>
                      {data.reviewsPagination && data.reviewsPagination.last_page > 1 && (
                        <Pagination
                          currentPage={data.reviewsPagination.current_page}
                          totalPages={data.reviewsPagination.last_page}
                          onPageChange={(page) => onReviewsPageChange?.(page)}
                        />
                      )}
                    </>
                  ) : (
                    <Styled.EmptyState>
                      <Text type="h3" color="white">
                        {t('company.noReviews')}
                      </Text>
                      <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
                        {t('company.beFirstToReview')}
                      </Text>
                    </Styled.EmptyState>
                  )}
                </>
              )}
            </CompanyTabs>
          </Styled.LeftColumn>
        )}

        {/* Right Column - Company Info */}
        <Styled.RightColumn>
          <CompanyInfo
            companyId={data.id}
            category={category}
            logo={data.logo || ''}
            name={data.name}
            rating={typeof data.rating === 'number' ? data.rating.toString() : data.rating}
            address={data.address || ''}
            description={data.description || ''}
            phones={data.phones || []}
            workHours={
              typeof data.workHours === 'object' && data.workHours !== null && !Array.isArray(data.workHours)
                ? (data.workHours as {
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
              Array.isArray(data.externalLinks) 
                ? {} 
                : (data.externalLinks as Record<string, string> | undefined)
            }
          />
        </Styled.RightColumn>
      </Styled.MainContent>
    </Styled.PageContainer>
  );
}

