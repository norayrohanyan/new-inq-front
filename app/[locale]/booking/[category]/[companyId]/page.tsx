'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  getCompanyDetailsThunk,
  getCompanyServicesThunk,
  getCompanyEmployeesThunk,
  getBeautyIntervalsThunk,
  createBeautyBookingThunk,
  companyDetailsSelectors,
  companyDetailsActions,
  authSelectors,
} from '@/store';
import { getCategoryTemplate } from '@/consts/categoryTemplates';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Calendar from '@/components/Calendar';
import * as Styled from './styled';

type BookingStep = 'service' | 'employee' | 'datetime' | 'info' | 'success';

interface SelectedService {
  id: number;
  name: string;
  price: number;
  duration?: string;
}

interface SelectedEmployee {
  id: number;
  name: string;
  imageUrl?: string;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const category = params.category as string;
  const companyId = Number(params.companyId);
  
  // Get pre-selected items from URL params
  const preSelectedServiceId = searchParams.get('serviceId');
  const preSelectedEmployeeId = searchParams.get('employeeId');

  // Redux selectors
  const companyDetails = useAppSelector(companyDetailsSelectors.companyDetails);
  const services = useAppSelector(companyDetailsSelectors.services);
  const employees = useAppSelector(companyDetailsSelectors.employees);
  const isLoading = useAppSelector(companyDetailsSelectors.isLoading);
  const beautyTimeSlots = useAppSelector(companyDetailsSelectors.beautyTimeSlots);
  const isLoadingTimeSlots = useAppSelector(companyDetailsSelectors.isLoadingTimeSlots);
  const availableIntervals = useAppSelector(companyDetailsSelectors.intervals);
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);

  // Check authentication - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, locale, router]);

  // Get template config to know what features are available
  const templateConfig = getCategoryTemplate(category);

  // Booking state
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<SelectedEmployee | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingForOther, setBookingForOther] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [comments, setComments] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data
  useEffect(() => {
    if (companyId && category) {
      dispatch(getCompanyDetailsThunk({ category, id: companyId }));
      dispatch(getCompanyServicesThunk({ category, id: companyId }));
      
      if (templateConfig?.features.hasEmployees) {
        dispatch(getCompanyEmployeesThunk({ category, id: companyId }));
      }
    }
  }, [companyId, category, templateConfig, dispatch]);

  // Pre-select items from URL params once data is loaded and set initial step
  useEffect(() => {
    if (isInitialized || !services || services.length === 0) return;

    let initialStep: BookingStep = 'service';

    // Pre-select employee first if employeeId is in URL (from employee tab)
    if (preSelectedEmployeeId && employees && employees.length > 0) {
      const employee = employees.find((e: any) => e.id === Number(preSelectedEmployeeId));
      if (employee) {
        setSelectedEmployee({
          id: employee.id,
          name: employee.name,
          imageUrl: (employee as any).image_url || (employee as any).imageUrl,
        });
        // If employee is pre-selected, start at service step
        initialStep = 'service';
      }
    }

    // Pre-select service if serviceId is in URL (from service tab)
    if (preSelectedServiceId && services) {
      const service = services.find((s: any) => s.id === Number(preSelectedServiceId));
      if (service) {
        setSelectedServices([{
          id: service.id,
          name: service.name,
          price: service.price || 0,
          duration: (service as any).duration,
        }]);
        // If service is pre-selected but not employee, go to employee step
        if (!preSelectedEmployeeId && templateConfig?.features.hasEmployees) {
          initialStep = 'employee';
        } else if (preSelectedEmployeeId) {
          // Both are pre-selected, go to datetime
          initialStep = 'datetime';
        } else {
          initialStep = 'datetime';
        }
      }
    }

    setCurrentStep(initialStep);
    setIsInitialized(true);
  }, [services, employees, preSelectedServiceId, preSelectedEmployeeId, isInitialized, templateConfig]);

  // Calculate total price and duration in frontend
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  
  // Calculate total duration in minutes
  const totalDuration = selectedServices.reduce((sum, service) => {
    if (!service.duration) return sum;
    const durationMatch = service.duration.match(/(\d+)/);
    return sum + (durationMatch ? parseInt(durationMatch[0]) : 0);
  }, 0);

  // Filter out pre-selected employee from the employee list
  const availableEmployees = preSelectedEmployeeId && employees
    ? employees.filter((emp: any) => emp.id !== Number(preSelectedEmployeeId))
    : employees;

  // Fetch time slots when date is selected using Redux thunk
  // Only fetch when we have a date (on datetime step)
  useEffect(() => {
    if (selectedDate && selectedServices.length > 0) {
      dispatch(getBeautyIntervalsThunk({
        company_id: companyId,
        service_ids: selectedServices.map(s => s.id),
        day: selectedDate,
        ...(selectedEmployee && { employee_id: selectedEmployee.id }),
      }));
    }
  }, [selectedDate, companyId, dispatch]); // Removed selectedServices and selectedEmployee from deps

  // Generate available date intervals when reaching datetime step
  useEffect(() => {
    if (currentStep === 'datetime' && companyId && selectedServices.length > 0) {
      // Generate dates for the next 60 days (for calendar display)
      const intervals: Record<string, any> = {};
      const today = new Date();
      
      for (let i = 0; i < 60; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        
        // Skip Sundays (0)
        const dayOfWeek = date.getDay();
        const isAvailable = dayOfWeek !== 0;
        
        intervals[dateString] = {
          date: dateString,
          available: isAvailable,
          discounted: false,
        };
      }
      
      // Set intervals directly in state (this is for calendar display only)
      dispatch(companyDetailsActions.setIntervals(intervals));
    }
  }, [currentStep, companyId, selectedServices, dispatch]);

  // Step navigation - dynamic based on what's pre-selected
  const getStepNumber = (step: BookingStep): number => {
    const steps = ['service', 'employee', 'datetime', 'info', 'success'];
    return steps.indexOf(step) + 1;
  };

  // Check if a step is completed based on pre-selection and current state
  const isStepCompleted = (step: BookingStep): boolean => {
    const currentStepNum = getStepNumber(currentStep);
    const stepNum = getStepNumber(step);
    
    // Check if we've passed this step
    if (currentStepNum > stepNum) return true;
    
    // Check pre-selected items
    if (step === 'service' && preSelectedServiceId && selectedServices.length > 0) return true;
    if (step === 'employee' && preSelectedEmployeeId && selectedEmployee) return true;
    
    return false;
  };

  const handleServiceToggle = (service: any) => {
    const isSelected = selectedServices.some(s => s.id === service.id);
    
    if (isSelected) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([
        ...selectedServices,
        {
          id: service.id,
          name: service.name,
          price: service.price,
          duration: service.duration,
        },
      ]);
    }
  };

  const handleEmployeeSelect = (employee: any) => {
    // Allow selecting/deselecting employee only if not pre-selected
    if (preSelectedEmployeeId && employee.id === Number(preSelectedEmployeeId)) {
      return; // Don't allow deselecting pre-selected employee
    }
    
    if (selectedEmployee?.id === employee.id) {
      setSelectedEmployee(null); // Deselect if already selected
    } else {
      setSelectedEmployee({
        id: employee.id,
        name: employee.name,
        imageUrl: employee.imageUrl || employee.avatar,
      });
    }
  };

  const handleContinue = () => {
    if (currentStep === 'service' && selectedServices.length > 0) {
      // If employee is pre-selected, skip directly to datetime
      if (preSelectedEmployeeId && selectedEmployee) {
        setCurrentStep('datetime');
      } else if (templateConfig?.features.hasEmployees && availableEmployees && availableEmployees.length > 0) {
        // Show employee selection only if there are employees available
        setCurrentStep('employee');
      } else {
        setCurrentStep('datetime');
      }
    } else if (currentStep === 'employee') {
      setCurrentStep('datetime');
    } else if (currentStep === 'datetime' && selectedDate && selectedTime) {
      setCurrentStep('info');
    } else if (currentStep === 'info') {
      handleSubmitBooking();
    }
  };

  const handleBack = () => {
    if (currentStep === 'employee') {
      setCurrentStep('service');
    } else if (currentStep === 'datetime') {
      // If employee is pre-selected, skip back to service
      if (preSelectedEmployeeId && selectedEmployee) {
        setCurrentStep('service');
      } else if (templateConfig?.features.hasEmployees) {
        setCurrentStep('employee');
      } else {
        setCurrentStep('service');
      }
    } else if (currentStep === 'info') {
      setCurrentStep('datetime');
    }
  };

  const handleSubmitBooking = async () => {
    if (!selectedDate || !selectedTime) {
      console.error('Date and time are required');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const dateTime = `${selectedDate} ${selectedTime}`;
      
      const bookingData = {
        company_id: companyId,
        service_ids: selectedServices.map(s => s.id),
        day: dateTime,
        ...(selectedEmployee && { employee_id: selectedEmployee.id }),
        ...(comments.trim() && { comment: comments.trim() }),
        ...(bookingForOther && guestName.trim() && guestPhone.trim() && {
          guest: {
            name: guestName.trim(),
            phone: guestPhone.trim(),
          }
        }),
      };
      
      const result = await dispatch(createBeautyBookingThunk(bookingData)).unwrap();
      
      if (result) {
        setCurrentStep('success');
      }
    } catch (error: any) {
      console.error('Error creating booking:', error);
      alert(error || 'An error occurred while creating your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canContinue = () => {
    if (currentStep === 'service') return selectedServices.length > 0;
    if (currentStep === 'employee') return true; // Employee selection is optional
    if (currentStep === 'datetime') return selectedDate && selectedTime;
    if (currentStep === 'info') {
      // Validate guest info if booking for someone else
      if (bookingForOther) {
        return guestName.trim().length > 0 && guestPhone.trim().length > 0;
      }
      return true;
    }
    return false;
  };

  if (isLoading && !companyDetails) {
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

  if (!companyDetails) {
    return null;
  }

  // Success screen
  if (currentStep === 'success') {
    return (
      <Styled.PageContainer>
        <Styled.SuccessContainer>
          <Styled.SuccessIcon>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="4"/>
              <path d="M35 60L52 77L85 44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Styled.SuccessIcon>
          
          <Text type="h2" color="white" fontWeight="700" align="center">
            {t('booking.thankYou')}
          </Text>
          
          <Text type="body" color="secondarySemiLight" align="center">
            {t('booking.confirmationMessage')}
          </Text>

          <Styled.SuccessButtons>
            <Button variant="secondary" onClick={() => router.push(`/${locale}`)}>
              {t('booking.backToHome')}
            </Button>
            <Button variant="primary" onClick={() => router.push(`/${locale}/profile`)}>
              {t('booking.viewBooking')}
            </Button>
          </Styled.SuccessButtons>
        </Styled.SuccessContainer>
      </Styled.PageContainer>
    );
  }

  return (
    <Styled.PageContainer>
      {/* Progress Steps */}
      {(currentStep as BookingStep) !== 'success' && (
      <Styled.StepsContainer>
        {/* Step 1: Company (only shown if booking from company page, not from employee/service) */}
        {!preSelectedEmployeeId && !preSelectedServiceId && (
          <Styled.StepWrapper>
            <Styled.StepItem $active={false} $completed={true}>
              <Styled.StepIcon $active={false} $completed={true}>
                ✓
              </Styled.StepIcon>
              <Styled.StepLabel>{t('booking.steps.company')}</Styled.StepLabel>
            </Styled.StepItem>
            <Styled.StepLine $completed={true} />
          </Styled.StepWrapper>
        )}

        {/* Step 2: Service or Employee (depending on what's pre-selected) */}
        {preSelectedEmployeeId ? (
          // Employee is pre-selected, show as completed
          <>
            <Styled.StepWrapper>
              <Styled.StepItem $active={false} $completed={true}>
                <Styled.StepIcon $active={false} $completed={true}>
                  ✓
                </Styled.StepIcon>
                <Styled.StepLabel>{t('booking.steps.employee')}</Styled.StepLabel>
              </Styled.StepItem>
              <Styled.StepLine $completed={true} />
            </Styled.StepWrapper>
            <Styled.StepWrapper>
              <Styled.StepItem $active={currentStep === 'service'} $completed={isStepCompleted('service')}>
                <Styled.StepIcon $active={currentStep === 'service'} $completed={isStepCompleted('service')}>
                  {isStepCompleted('service') ? '✓' : currentStep === 'service' ? <Styled.StepIconInner /> : ''}
                </Styled.StepIcon>
                <Styled.StepLabel $active={currentStep === 'service'}>{t('booking.steps.service')}</Styled.StepLabel>
              </Styled.StepItem>
              <Styled.StepLine $completed={isStepCompleted('service')} />
            </Styled.StepWrapper>
          </>
        ) : preSelectedServiceId ? (
          // Service is pre-selected, show as completed
          <>
            <Styled.StepWrapper>
              <Styled.StepItem $active={false} $completed={true}>
                <Styled.StepIcon $active={false} $completed={true}>
                  ✓
                </Styled.StepIcon>
                <Styled.StepLabel>{t('booking.steps.service')}</Styled.StepLabel>
              </Styled.StepItem>
              <Styled.StepLine $completed={true} />
            </Styled.StepWrapper>
            {templateConfig?.features.hasEmployees && (
              <Styled.StepWrapper>
                <Styled.StepItem $active={currentStep === 'employee'} $completed={isStepCompleted('employee')}>
                  <Styled.StepIcon $active={currentStep === 'employee'} $completed={isStepCompleted('employee')}>
                    {isStepCompleted('employee') ? '✓' : currentStep === 'employee' ? <Styled.StepIconInner /> : ''}
                  </Styled.StepIcon>
                  <Styled.StepLabel $active={currentStep === 'employee'}>{t('booking.steps.employee')}</Styled.StepLabel>
                </Styled.StepItem>
                <Styled.StepLine $completed={isStepCompleted('employee')} />
              </Styled.StepWrapper>
            )}
          </>
        ) : (
          // Normal flow: Service -> Employee
          <>
            <Styled.StepWrapper>
              <Styled.StepItem $active={currentStep === 'service'} $completed={isStepCompleted('service')}>
                <Styled.StepIcon $active={currentStep === 'service'} $completed={isStepCompleted('service')}>
                  {isStepCompleted('service') ? '✓' : currentStep === 'service' ? <Styled.StepIconInner /> : ''}
                </Styled.StepIcon>
                <Styled.StepLabel $active={currentStep === 'service'}>{t('booking.steps.service')}</Styled.StepLabel>
              </Styled.StepItem>
              <Styled.StepLine $completed={isStepCompleted('service')} />
            </Styled.StepWrapper>
            {templateConfig?.features.hasEmployees && (
              <Styled.StepWrapper>
                <Styled.StepItem $active={currentStep === 'employee'} $completed={isStepCompleted('employee')}>
                  <Styled.StepIcon $active={currentStep === 'employee'} $completed={isStepCompleted('employee')}>
                    {isStepCompleted('employee') ? '✓' : currentStep === 'employee' ? <Styled.StepIconInner /> : ''}
                  </Styled.StepIcon>
                  <Styled.StepLabel $active={currentStep === 'employee'}>{t('booking.steps.employee')}</Styled.StepLabel>
                </Styled.StepItem>
                <Styled.StepLine $completed={isStepCompleted('employee')} />
              </Styled.StepWrapper>
            )}
          </>
        )}

        {/* Date/Time Step */}
        <Styled.StepWrapper>
          <Styled.StepItem $active={currentStep === 'datetime'} $completed={isStepCompleted('datetime')}>
            <Styled.StepIcon $active={currentStep === 'datetime'} $completed={isStepCompleted('datetime')}>
              {isStepCompleted('datetime') ? '✓' : currentStep === 'datetime' ? <Styled.StepIconInner /> : ''}
            </Styled.StepIcon>
            <Styled.StepLabel $active={currentStep === 'datetime'}>{t('booking.steps.datetime')}</Styled.StepLabel>
          </Styled.StepItem>
          <Styled.StepLine $completed={isStepCompleted('datetime')} />
        </Styled.StepWrapper>

        {/* Final Step */}
        <Styled.StepWrapper>
          <Styled.StepItem $active={currentStep === 'info'} $completed={false}>
            <Styled.StepIcon $active={currentStep === 'info'} $completed={false}>
              {currentStep === 'info' ? <Styled.StepIconInner /> : ''}
            </Styled.StepIcon>
            <Styled.StepLabel $active={currentStep === 'info'}>{t('booking.steps.final')}</Styled.StepLabel>
          </Styled.StepItem>
        </Styled.StepWrapper>
      </Styled.StepsContainer>
      )}

        {/* Content Area */}
      {(currentStep as BookingStep) !== 'success' && (
        <Styled.ContentArea>
          {currentStep !== 'employee' && (
            <Text type="h2" color="white" fontWeight="700" align="center">
              {currentStep === 'service' && t('booking.chooseService')}
              {currentStep === 'datetime' && t('booking.chooseDateTime')}
              {currentStep === 'info' && t('booking.bookingInfo')}
            </Text>
          )}

        {/* Step: Choose Service */}
        {currentStep === 'service' && (
          <Styled.SelectionList>
            {services && services.map((service: any) => (
              <Styled.SelectionItem
                key={service.id}
                $selected={selectedServices.some(s => s.id === service.id)}
                onClick={() => handleServiceToggle(service)}
              >
                <Styled.Checkbox $checked={selectedServices.some(s => s.id === service.id)} />
                <Text type="body" color="white" fontWeight="400">
                  {service.name}
                </Text>
              </Styled.SelectionItem>
            ))}
          </Styled.SelectionList>
        )}

        {/* Step: Choose Employee */}
        {currentStep === 'employee' && (
          <>
            {/* Show pre-selected employee banner if exists */}
            {preSelectedEmployeeId && selectedEmployee && (
              <Styled.PreSelectedBanner>
                <Styled.PreSelectedEmployee>
                  <Styled.EmployeeAvatar 
                    src={selectedEmployee.imageUrl || '/images/default-avatar.png'}
                    alt={selectedEmployee.name}
                  />
                  <div>
                    <Text type="body" color="secondarySemiLight" fontWeight="400">
                      {t('booking.selectedEmployee')}
                    </Text>
                    <Text type="h4" color="white" fontWeight="600">
                      {selectedEmployee.name}
                    </Text>
                  </div>
                </Styled.PreSelectedEmployee>
              </Styled.PreSelectedBanner>
            )}

            <Styled.EmployeeGrid>
              <div>
                <Text type="h3" color="white" fontWeight="700" style={{ marginBottom: '1.5rem' }}>
                  {preSelectedEmployeeId ? t('booking.chooseAnotherEmployee') : t('booking.chooseEmployee')}
                </Text>
                <Styled.EmployeeList>
                  {availableEmployees && availableEmployees.map((employee: any) => (
                    <Styled.EmployeeItem
                      key={employee.id}
                      $selected={selectedEmployee?.id === employee.id}
                      onClick={() => handleEmployeeSelect(employee)}
                    >
                      <Styled.Checkbox $checked={selectedEmployee?.id === employee.id} />
                      <Styled.EmployeeAvatar 
                        src={employee.imageUrl || employee.avatar || '/images/default-avatar.png'}
                        alt={employee.name}
                      />
                      <Text type="body" color="white" fontWeight="400">
                        {employee.name}
                      </Text>
                    </Styled.EmployeeItem>
                  ))}
                </Styled.EmployeeList>
              </div>

              <div>
                <Text type="h3" color="white" fontWeight="700" style={{ marginBottom: '1.5rem' }}>
                  {t('booking.additionalServices')}
                </Text>
                <Styled.AdditionalServicesList>
                  {services && services.map((service: any) => (
                    <Styled.AdditionalServiceItem
                      key={service.id}
                      $selected={selectedServices.some(s => s.id === service.id)}
                      onClick={() => handleServiceToggle(service)}
                    >
                      <Styled.ServiceCheckbox $checked={selectedServices.some(s => s.id === service.id)} />
                      <Text type="body" color="white" fontWeight="400">
                        {service.name}
                      </Text>
                    </Styled.AdditionalServiceItem>
                  ))}
                </Styled.AdditionalServicesList>
              </div>
            </Styled.EmployeeGrid>

            {/* Booking Summary at Bottom */}
            <Styled.BookingSummarySection>
              <Styled.SummaryContent>
                {selectedServices.map((service) => (
                  <Styled.SummaryRow key={service.id}>
                    <Text type="body" color="white" fontWeight="400">
                      {service.name}:
                    </Text>
                    <Text type="body" color="brandOrangeMid" fontWeight="600">
                      ֏ {service.price.toLocaleString()}
                    </Text>
                  </Styled.SummaryRow>
                ))}
                <Styled.SummaryTotalRow>
                  <Text type="h4" color="white" fontWeight="700">
                    {t('booking.total')}
                  </Text>
                  <Text type="h4" color="brandOrangeMid" fontWeight="700">
                    ֏ {totalPrice.toLocaleString()}
                  </Text>
                </Styled.SummaryTotalRow>
              </Styled.SummaryContent>
              
              <Styled.SummaryActions>
                <Button variant="secondary" onClick={handleBack}>
                  {t('booking.back')}
                </Button>
                <Button variant="primary" onClick={handleContinue} disabled={!canContinue()}>
                  {t('booking.continue')}
                </Button>
              </Styled.SummaryActions>
            </Styled.BookingSummarySection>
          </>
        )}

        {/* Step: Choose Date/Time */}
        {currentStep === 'datetime' && (
          <Styled.DateTimeContainer>
            <Calendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              minDate={new Date()}
              intervals={availableIntervals}
            />

            {/* Time Slots */}
            {selectedDate && isLoadingTimeSlots && (
              <div style={{ width: '100%', padding: '3rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text type="body" color="white" align="center">
                  {t('common.loading')}
                </Text>
              </div>
            )}
            
            {selectedDate && !isLoadingTimeSlots && beautyTimeSlots.length > 0 && (
              <Styled.TimeSlotsSection>
                <Text type="h4" color="white" fontWeight="700" style={{ marginBottom: '1rem' }}>
                  {t('booking.availableTimes')}
                </Text>
                <Styled.TimeSlotGrid>
                  {beautyTimeSlots.map((slot) => (
                    <Styled.TimeSlotButton
                      key={slot.start}
                      $selected={selectedTime === slot.start}
                      onClick={() => setSelectedTime(slot.start)}
                    >
                      <Text type="body" color="white" fontWeight="500">
                        {slot.start}
                      </Text>
                    </Styled.TimeSlotButton>
                  ))}
                </Styled.TimeSlotGrid>
              </Styled.TimeSlotsSection>
            )}
            
            {selectedDate && !isLoadingTimeSlots && beautyTimeSlots.length === 0 && (
              <div style={{ width: '100%', padding: '3rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', marginTop: '2rem' }}>
                <Text type="body" color="secondarySemiLight" align="center">
                  {t('booking.noAvailableTimes')}
                </Text>
              </div>
            )}
          </Styled.DateTimeContainer>
        )}

        {/* Step: Booking Info */}
        {currentStep === 'info' && (
          <Styled.BookingInfoContainer>
            <Styled.InfoCard>
              <Text type="h4" color="white" fontWeight="700">
                {t('booking.bookingInfo')}
              </Text>
              
              <Styled.InfoRow>
                <Text type="body" color="secondarySemiLight">
                  {t('booking.date')}:
                </Text>
                <Text type="body" color="white" fontWeight="600">
                  {selectedDate && new Date(selectedDate).toLocaleDateString()} {selectedTime}
                </Text>
              </Styled.InfoRow>

              <Styled.InfoRow>
                <Text type="body" color="secondarySemiLight">
                  {t('booking.company')}:
                </Text>
                <Text type="body" color="white" fontWeight="600">
                  {companyDetails.name}
                </Text>
              </Styled.InfoRow>

              {selectedServices.length > 0 && (
                <Styled.InfoRow>
                  <Text type="body" color="secondarySemiLight">
                    {selectedServices.length === 1 ? t('booking.service') : t('booking.services')}:
                  </Text>
                  <Text type="body" color="white" fontWeight="600">
                    {selectedServices.map(s => s.name).join(', ')}
                  </Text>
                </Styled.InfoRow>
              )}

              {selectedEmployee && (
                <Styled.InfoRow>
                  <Text type="body" color="secondarySemiLight">
                    {t('booking.employee')}:
                  </Text>
                  <Text type="body" color="white" fontWeight="600">
                    {selectedEmployee.name}
                  </Text>
                </Styled.InfoRow>
              )}

              {totalDuration > 0 && (
                <Styled.InfoRow>
                  <Text type="body" color="secondarySemiLight">
                    {t('booking.duration')}:
                  </Text>
                  <Text type="body" color="white" fontWeight="600">
                    {totalDuration} {t('booking.minutes')}
                  </Text>
                </Styled.InfoRow>
              )}

              <Styled.InfoRow>
                <Text type="body" color="secondarySemiLight">
                  {t('booking.price')}:
                </Text>
                <Text type="body" color="brandOrangeMid" fontWeight="700">
                  {totalPrice.toLocaleString()} {t('booking.dram')}
                </Text>
              </Styled.InfoRow>
            </Styled.InfoCard>

            <Styled.FormContainer>
              <Styled.CheckboxRow onClick={() => setBookingForOther(!bookingForOther)}>
                <Styled.Checkbox $checked={bookingForOther} />
                <Text type="body" color="white">
                  {t('company.bookingForSomeoneElse')}
                </Text>
              </Styled.CheckboxRow>

              {bookingForOther && (
                <>
                  <Styled.Input
                    type="text"
                    placeholder={t('company.guestName')}
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                  <Styled.Input
                    type="tel"
                    placeholder={t('company.guestPhone')}
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </>
              )}

              <Styled.TextArea
                placeholder={t('company.comments')}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
              />
          </Styled.FormContainer>
        </Styled.BookingInfoContainer>
        )}
        </Styled.ContentArea>
      )}

      {/* Action Buttons */}
      {(currentStep as BookingStep) !== 'success' && currentStep !== 'employee' && (
        <Styled.ActionsContainer>
          {currentStep !== 'service' && (
            <Button variant="secondary" onClick={handleBack}>
              {t('booking.back')}
            </Button>
          )}
          <Button 
            variant="primary" 
            onClick={handleContinue}
            disabled={!canContinue() || isSubmitting}
          >
            {isSubmitting ? t('common.loading') : (currentStep === 'info' ? t('booking.finish') : t('booking.continue'))}
          </Button>
        </Styled.ActionsContainer>
      )}
    </Styled.PageContainer>
  );
}


