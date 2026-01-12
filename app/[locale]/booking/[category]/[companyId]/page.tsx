'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createBeautyBookingThunk, authSelectors } from '@/store';
import { getCategoryTemplate } from '@/consts/categoryTemplates';
import Text from '@/components/Text';
import * as Styled from './styled';

import { ICompanyByService } from '@/store/types/companies';
import {
  BookingContext,
  StepsProgress,
  CompanyStep,
  ServiceStep,
  EmployeeStep,
  DateTimeStep,
  BookingInfoStep,
  SuccessScreen,
  ActionButtons,
} from './components';
import { useBookingState, useBookingNavigation, useBookingData } from './hooks';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const category = params.category as string;
  const companyIdParam = params.companyId as string;
  
  // Check if coming from service selection
  const isFromService = companyIdParam === '0' || companyIdParam === 'service';
  
  // URL params
  const preSelectedServiceId = searchParams.get('serviceId');
  const preSelectedEmployeeId = searchParams.get('employeeId');

  // Template config
  const templateConfig = getCategoryTemplate(category);
  const hasEmployees = templateConfig?.features.hasEmployees || false;

  // Auth check
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Save current URL as returnUrl so user is redirected back after login
      const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/${locale}/login?returnUrl=${currentUrl}`);
    }
  }, [isAuthenticated, locale, router]);

  // Booking state hook
  const bookingState = useBookingState({
    isFromService,
    preSelectedServiceId,
  });

  // Initialize company ID from URL
  useEffect(() => {
    if (!isFromService && companyIdParam) {
      bookingState.setSelectedCompanyId(Number(companyIdParam));
    }
  }, [isFromService, companyIdParam]);

  const companyId = bookingState.selectedCompanyId || 0;

  // Data fetching hook
  const bookingData = useBookingData({
    category,
    companyId,
    isFromService,
    preSelectedServiceId,
    preSelectedEmployeeId,
    hasEmployees,
    currentStep: bookingState.currentStep,
    selectedServices: bookingState.selectedServices,
    selectedEmployee: bookingState.selectedEmployee,
    selectedDate: bookingState.selectedDate,
  });

  // Navigation hook
  const navigation = useBookingNavigation({
    currentStep: bookingState.currentStep,
    setCurrentStep: bookingState.setCurrentStep,
    isFromService,
    preSelectedServiceId,
    preSelectedEmployeeId,
    hasEmployees,
    availableEmployeesCount: bookingData.availableEmployees.length,
    selectedServicesCount: bookingState.selectedServices.length,
    selectedCompanyId: bookingState.selectedCompanyId,
    selectedDate: bookingState.selectedDate,
    selectedTime: bookingState.selectedTime,
    bookingForOther: bookingState.bookingForOther,
    guestName: bookingState.guestName,
    guestPhone: bookingState.guestPhone,
  });

  // Pre-select items from URL params
  useEffect(() => {
    if (bookingState.isInitialized || !bookingData.services || bookingData.services.length === 0) return;

    if (preSelectedEmployeeId && bookingData.employees && bookingData.employees.length > 0) {
      const employee = bookingData.employees.find((e: any) => e.id === Number(preSelectedEmployeeId));
      if (employee) {
        bookingState.setSelectedEmployee({
          id: employee.id,
          name: employee.name,
          imageUrl: (employee as any).image_url || (employee as any).imageUrl,
        });
      }
    }

    if (preSelectedServiceId && bookingData.services) {
      const service = bookingData.services.find((s: any) => s.id === Number(preSelectedServiceId));
      if (service) {
        bookingState.setSelectedServices([{
          id: service.id,
          name: service.name,
          price: service.price || 0,
          duration: (service as any).duration,
        }]);
        
        if (!preSelectedEmployeeId && hasEmployees) {
          bookingState.setCurrentStep('employee');
        } else {
          bookingState.setCurrentStep('datetime');
        }
      }
    }

    bookingState.setIsInitialized(true);
  }, [bookingData.services, bookingData.employees, preSelectedServiceId, preSelectedEmployeeId, bookingState.isInitialized, hasEmployees]);

  // Handlers
  const handleCompanySelect = (company: ICompanyByService) => {
    bookingState.setSelectedCompanyId(company.id);
    bookingState.setCurrentStep('service');
  };

  const handleEmployeeSelect = (employee: any) => {
    bookingState.handleEmployeeSelect(employee, preSelectedEmployeeId);
  };

  const handleSubmitBooking = async () => {
    if (!bookingState.selectedDate || !bookingState.selectedTime) return;

    bookingState.setIsSubmitting(true);
    
    try {
      const bookingDataPayload = {
        company_id: companyId,
        service_ids: bookingState.selectedServices.map(s => s.id),
        day: `${bookingState.selectedDate} ${bookingState.selectedTime}`,
        ...(bookingState.selectedEmployee && { employee_id: bookingState.selectedEmployee.id }),
        ...(bookingState.comments.trim() && { comment: bookingState.comments.trim() }),
        ...(bookingState.bookingForOther && bookingState.guestName.trim() && bookingState.guestPhone.trim() && {
          guest: { name: bookingState.guestName.trim(), phone: bookingState.guestPhone.trim() }
        }),
      };
      
      const result = await dispatch(createBeautyBookingThunk(bookingDataPayload)).unwrap();
      if (result) bookingState.setCurrentStep('success');
    } catch (error: any) {
      console.error('Error creating booking:', error);
      alert(error || 'An error occurred. Please try again.');
    } finally {
      bookingState.setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    navigation.handleContinue(handleSubmitBooking);
  };

  // Context value
  const contextValue = useMemo(() => ({
    // Step
    currentStep: bookingState.currentStep,
    setCurrentStep: bookingState.setCurrentStep,
    
    // Company
    isFromService,
    selectedCompanyId: bookingState.selectedCompanyId,
    companiesByService: bookingData.companiesByService,
    isLoadingCompanies: bookingData.isLoadingCompanies,
    handleCompanySelect,
    
    // Services
    services: bookingData.services,
    additionalServices: bookingData.additionalServices,
    selectedServices: bookingState.selectedServices,
    handleServiceToggle: bookingState.handleServiceToggle,
    preSelectedServiceId,
    
    // Employees
    employees: bookingData.employees,
    availableEmployees: bookingData.availableEmployees,
    selectedEmployee: bookingState.selectedEmployee,
    handleEmployeeSelect,
    preSelectedEmployeeId,
    hasEmployees,
    
    // DateTime
    selectedDate: bookingState.selectedDate,
    setSelectedDate: bookingState.setSelectedDate,
    selectedTime: bookingState.selectedTime,
    setSelectedTime: bookingState.setSelectedTime,
    beautyTimeSlots: bookingData.beautyTimeSlots,
    isLoadingTimeSlots: bookingData.isLoadingTimeSlots,
    availableIntervals: bookingData.availableIntervals,
    
    // Guest
    bookingForOther: bookingState.bookingForOther,
    setBookingForOther: bookingState.setBookingForOther,
    guestName: bookingState.guestName,
    setGuestName: bookingState.setGuestName,
    guestPhone: bookingState.guestPhone,
    setGuestPhone: bookingState.setGuestPhone,
    comments: bookingState.comments,
    setComments: bookingState.setComments,
    
    // Calculations
    totalPrice: bookingState.totalPrice,
    totalDuration: bookingState.totalDuration,
    
    // Navigation
    handleContinue,
    handleBack: navigation.handleBack,
    canContinue: navigation.canContinue,
    canGoBack: navigation.canGoBack,
    isSubmitting: bookingState.isSubmitting,
    
    // Details
    companyDetails: bookingData.companyDetails,
    templateConfig,
  }), [
    bookingState.currentStep, isFromService, bookingState.selectedCompanyId,
    bookingData.companiesByService, bookingData.isLoadingCompanies,
    bookingData.services, bookingData.additionalServices, bookingState.selectedServices,
    preSelectedServiceId, bookingData.employees, bookingData.availableEmployees,
    bookingState.selectedEmployee, preSelectedEmployeeId, hasEmployees,
    bookingState.selectedDate, bookingState.selectedTime,
    bookingData.beautyTimeSlots, bookingData.isLoadingTimeSlots, bookingData.availableIntervals,
    bookingState.bookingForOther, bookingState.guestName, bookingState.guestPhone, bookingState.comments,
    bookingState.totalPrice, bookingState.totalDuration,
    navigation.handleBack, navigation.canContinue, navigation.canGoBack,
    bookingState.isSubmitting, bookingData.companyDetails, templateConfig,
  ]);

  // Loading states
  if (bookingData.isLoading && !bookingData.companyDetails && !isFromService) {
    return (
      <Styled.PageContainer>
        <Styled.LoadingContainer>
          <Text type="h4" color="white">{t('common.loading')}</Text>
        </Styled.LoadingContainer>
      </Styled.PageContainer>
    );
  }

  if (!bookingData.companyDetails && !isFromService) return null;
  if (isFromService && bookingState.currentStep === 'company' && !bookingState.selectedCompanyId) {
    // Allow rendering company step
  } else if (!bookingData.companyDetails && bookingState.currentStep !== 'company') {
    return null;
  }

  // Success screen
  if (bookingState.currentStep === 'success') {
    return <SuccessScreen />;
  }

  return (
    <BookingContext.Provider value={contextValue}>
      <Styled.PageContainer>
        <StepsProgress />
        
        <Styled.ContentArea>
          {bookingState.currentStep === 'company' && <CompanyStep />}
          {bookingState.currentStep === 'service' && <ServiceStep />}
          {bookingState.currentStep === 'employee' && <EmployeeStep />}
          {bookingState.currentStep === 'datetime' && <DateTimeStep />}
          {bookingState.currentStep === 'info' && <BookingInfoStep />}
        </Styled.ContentArea>

        <ActionButtons />
      </Styled.PageContainer>
    </BookingContext.Provider>
  );
}
