'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  getCompanyDetailsThunk,
  getCompanyServicesThunk,
  getCompanyEmployeesThunk,
  getCompanyPortfolioThunk,
  getCompanyReviewsThunk,
  getCarDetailsThunk,
  getApartmentDetailsThunk,
  getCarIntervalsThunk,
  getApartmentIntervalsThunk,
  companyDetailsSelectors,
  authSelectors,
} from '@/store';
import {
  getCategoryTemplate,
  isRentalCategory,
  isServiceCategory,
} from '@/consts/categoryTemplates';
import RentalDetailTemplate from '@/components/templates/RentalDetailTemplate';
import ServiceDetailTemplate from '@/components/templates/ServiceDetailTemplate';
import Text from '@/components/Text';
import { HomeIcon, BedIcon, LocationIcon } from '@/components/icons';
import * as Styled from './styled';

export default function UnifiedDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  
  const category = params.category as string;
  const itemId = Number(params.id);

  // Get template configuration
  const templateConfig = getCategoryTemplate(category);
  
  // Reviews pagination state
  const [reviewsPage, setReviewsPage] = useState(1);

  // Redux selectors
  const companyDetails = useAppSelector(companyDetailsSelectors.companyDetails);
  const carDetails = useAppSelector(companyDetailsSelectors.carDetails);
  const apartmentDetails = useAppSelector(companyDetailsSelectors.apartmentDetails);
  const services = useAppSelector(companyDetailsSelectors.services);
  const employees = useAppSelector(companyDetailsSelectors.employees);
  const portfolio = useAppSelector(companyDetailsSelectors.portfolio);
  const reviews = useAppSelector(companyDetailsSelectors.reviews);
  const reviewsPagination = useAppSelector(companyDetailsSelectors.reviewsPagination);
  const intervals = useAppSelector(companyDetailsSelectors.intervals);
  const isLoading = useAppSelector(companyDetailsSelectors.isLoading);
  const isLoadingTimeSlots = useAppSelector(companyDetailsSelectors.isLoadingTimeSlots);
  const isLoadingReviews = useAppSelector(companyDetailsSelectors.isLoadingReviews);
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);

  // Interval thunks mapping
  const intervalThunks: Record<string, typeof getCarIntervalsThunk | typeof getApartmentIntervalsThunk> = {
    car_rental: getCarIntervalsThunk,
    apartment_rental: getApartmentIntervalsThunk,
  };

  // Handle month change for interval loading
  const handleMonthChange = useCallback((startDate: string) => {
    const thunk = intervalThunks[category];
    if (thunk) {
      dispatch(thunk({ id: itemId, startDate, append: true }));
    }
  }, [category, itemId, dispatch]);

  // Fetch data based on template type
  useEffect(() => {
    if (!itemId || !category || !templateConfig) return;

    if (isServiceCategory(category)) {
      // Fetch company data for service template
      dispatch(getCompanyDetailsThunk({ category, id: itemId }));
      
      if (templateConfig.features.hasServices) {
        dispatch(getCompanyServicesThunk({ category, id: itemId }));
      }
      
      if (templateConfig.features.hasEmployees) {
        dispatch(getCompanyEmployeesThunk({ category, id: itemId }));
      }
      
      if (templateConfig.features.hasPortfolio) {
        dispatch(getCompanyPortfolioThunk({ category, id: itemId }));
      }

      if (templateConfig.features.hasReviews) {
        dispatch(getCompanyReviewsThunk({ category, id: itemId, page: 1, perPage: 10 }));
      }
    } else if (isRentalCategory(category)) {
      // Fetch item data for rental template (actual cars/apartments)
      if (category === 'car_rental') {
        dispatch(getCarDetailsThunk(itemId));
      } else if (category === 'apartment_rental') {
        dispatch(getApartmentDetailsThunk(itemId));
      }
    }
  }, [itemId, category, templateConfig, dispatch]);

  // Fetch reviews when page changes
  useEffect(() => {
    if (!itemId || !category || !templateConfig?.features.hasReviews) return;
    if (reviewsPage === 1) return; // Already fetched on initial load
    
    dispatch(getCompanyReviewsThunk({ category, id: itemId, page: reviewsPage, perPage: 10 }));
  }, [reviewsPage, itemId, category, templateConfig, dispatch]);

  // Handle reviews page change
  const handleReviewsPageChange = useCallback((page: number) => {
    setReviewsPage(page);
  }, []);

  // Handle invalid category
  if (!templateConfig) {
    return (
      <Styled.PageContainer>
        <Styled.ErrorContainer>
          <Text type="h3" color="white">
            {t('errors.categoryNotFound')}
          </Text>
        </Styled.ErrorContainer>
      </Styled.PageContainer>
    );
  }

  // Loading state
  if (isLoading && !companyDetails && !carDetails && !apartmentDetails) {
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

  // Render SERVICE template
  if (isServiceCategory(category) && companyDetails) {
    const serviceData = {
      id: companyDetails.id,
      name: companyDetails.name,
      description: companyDetails.description,
      logo: companyDetails.logo,
      rating: companyDetails.rating?.toString() || '0.0',
      address: companyDetails.address,
      phones: companyDetails.phones || [],
      workHours: companyDetails.work_hours,
      externalLinks: companyDetails.external_links || [],
      bannerUrls: companyDetails.banner_urls
        ? {
            desktopImage: companyDetails.banner_urls.desktop_image,
            mobileImage: companyDetails.banner_urls.mobile_image,
          }
        : undefined,
      services: services || [],
      employees: employees || [],
      portfolio: portfolio || [],
      reviews: reviews || [],
      reviewsPagination: reviewsPagination || undefined,
    };

    const handleServiceBook = (serviceId: number) => {
      // Check authentication first
      if (!isAuthenticated) {
        // Save intended booking destination so user is redirected back after login
        const intendedUrl = encodeURIComponent(`/${locale}/booking/${category}/${itemId}?serviceId=${serviceId}`);
        router.push(`/${locale}/login?returnUrl=${intendedUrl}`);
        return;
      }

      if (templateConfig.features.hasBookingFlow) {
        // Navigate to booking page with pre-selected service
        router.push(`/${locale}/booking/${category}/${itemId}?serviceId=${serviceId}`);
      } else {
        console.log('Book service:', serviceId);
      }
    };

    const handleEmployeeBook = (employeeId: number) => {
      // Check authentication first
      if (!isAuthenticated) {
        // Save intended booking destination so user is redirected back after login
        const intendedUrl = encodeURIComponent(`/${locale}/booking/${category}/${itemId}?employeeId=${employeeId}`);
        router.push(`/${locale}/login?returnUrl=${intendedUrl}`);
        return;
      }

      if (templateConfig.features.hasBookingFlow) {
        // Navigate to booking page with pre-selected employee
        router.push(`/${locale}/booking/${category}/${itemId}?employeeId=${employeeId}`);
      } else {
        console.log('Book employee:', employeeId);
      }
    };

    return (
      <ServiceDetailTemplate
        data={serviceData}
        category={category}
        features={templateConfig.features}
        onServiceBook={handleServiceBook}
        onEmployeeBook={handleEmployeeBook}
        onReviewsPageChange={handleReviewsPageChange}
        isLoading={isLoading}
        isLoadingReviews={isLoadingReviews}
      />
    );
  }

  // Render RENTAL template for CAR
  if (category === 'car_rental' && carDetails) {
    // Helper to normalize car data
    const normalizeCarField = (data: any) => {
      if (!data) return '';
      if (Array.isArray(data)) return data[0]?.data?.toString() || '';
      if (typeof data === 'object' && data.data !== undefined) {
        return data.data?.toString() || '';
      }
      return data.toString();
    };

    const specifications = [
      { label: t('car.body'), value: normalizeCarField(carDetails.body) },
      { label: t('car.gear'), value: normalizeCarField(carDetails.gear) },
      { label: t('car.motor'), value: normalizeCarField(carDetails.motor) },
      { label: t('car.fuel'), value: normalizeCarField(carDetails.fuel) },
      { label: t('car.expense'), value: normalizeCarField(carDetails.expense) },
      { label: t('car.seats'), value: normalizeCarField(carDetails.seats) },
      {
        label: t('car.leftWheel'),
        value: normalizeCarField((carDetails as any).is_left_wheel || carDetails.isLeftWheel),
      },
      {
        label: t('car.airConditioner'),
        value: normalizeCarField((carDetails as any).has_air_conditioner || carDetails.hasAirConditioner),
      },
    ].filter(spec => spec.value);

    const rentalData = {
      id: carDetails.id,
      name: carDetails.name,
      description: (carDetails as any).description || '',
      rating: carDetails.rating,
      price: carDetails.price,
      currency: carDetails.currency,
      imageUrls: carDetails.image_urls || [],
      intervals: intervals || carDetails.intervals || {},
      specifications,
    };

    return (
      <RentalDetailTemplate
        data={rentalData}
        category={category}
        type="car"
        onMonthChange={handleMonthChange}
        isLoadingIntervals={isLoadingTimeSlots}
      />
    );
  }

  // Render RENTAL template for APARTMENT
  if (category === 'apartment_rental' && apartmentDetails) {
    const specifications = [
      {
        icon: <HomeIcon width={20} height={20} />,
        label: t('company.checkIn'),
        value: apartmentDetails.check_in,
      },
      {
        icon: <HomeIcon width={20} height={20} />,
        label: t('company.checkOut'),
        value: apartmentDetails.check_out,
      },
      {
        icon: <HomeIcon width={20} height={20} />,
        label: t('company.apartment'),
        value: apartmentDetails.is_apartment ? t('common.yes') : t('common.no'),
      },
      {
        icon: <LocationIcon width={20} height={20} />,
        label: t('company.address'),
        value: apartmentDetails.address || '',
      },
      {
        icon: <HomeIcon width={20} height={20} />,
        label: '',
        value: `${apartmentDetails.total_square} m²`,
      },
      {
        icon: <BedIcon width={20} height={20} />,
        label: '',
        value: `${apartmentDetails.room_count} ${t('company.rooms')}`,
      },
    ].filter(spec => spec.value);

    const rentalData = {
      id: apartmentDetails.id,
      name: apartmentDetails.name,
      description: apartmentDetails.description || '',
      rating: apartmentDetails.rating,
      price: apartmentDetails.price,
      currency: apartmentDetails.currency,
      imageUrls: apartmentDetails.image_urls || [],
      intervals: intervals || apartmentDetails.intervals || {},
      address: apartmentDetails.address,
      latitude: apartmentDetails.latitude,
      longitude: apartmentDetails.longitude,
      companyId: apartmentDetails.company_id,
      companyName: apartmentDetails.company_name,
      specifications,
    };

    return (
      <RentalDetailTemplate
        data={rentalData}
        category={category}
        type="apartment"
        onMonthChange={handleMonthChange}
        isLoadingIntervals={isLoadingTimeSlots}
      />
    );
  }

  // No data available - errors handled globally by Redux toast
  return null;
}

