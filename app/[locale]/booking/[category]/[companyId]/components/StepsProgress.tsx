'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import * as Styled from '../styled';
import { useBookingContext } from './BookingContext';
import { BookingStep } from './types';

interface StepConfig {
  id: BookingStep;
  labelKey: string;
}

export const StepsProgress = () => {
  const t = useTranslations();
  const {
    currentStep,
    isFromService,
    selectedCompanyId,
    preSelectedEmployeeId,
    preSelectedServiceId,
    selectedServices,
    selectedEmployee,
    hasEmployees,
    selectedDate,
    selectedTime,
  } = useBookingContext();

  // Build dynamic steps array based on what's needed
  const steps = useMemo(() => {
    const stepsList: StepConfig[] = [];
    
    // Company step - only shown if coming from service selection
    if (isFromService) {
      stepsList.push({ id: 'company', labelKey: 'booking.steps.company' });
    }
    
    // Service step - only shown if NOT pre-selected
    if (!preSelectedServiceId) {
      stepsList.push({ id: 'service', labelKey: 'booking.steps.service' });
    }
    
    // Employee step - only shown if has employees AND NOT pre-selected
    if (hasEmployees && !preSelectedEmployeeId) {
      stepsList.push({ id: 'employee', labelKey: 'booking.steps.employee' });
    }
    
    // DateTime is always shown
    stepsList.push({ id: 'datetime', labelKey: 'booking.steps.datetime' });
    
    // Final is always shown
    stepsList.push({ id: 'info', labelKey: 'booking.steps.final' });
    
    return stepsList;
  }, [isFromService, preSelectedServiceId, hasEmployees, preSelectedEmployeeId]);

  // Get the index of current step
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  // Check if a step is completed
  const isStepCompleted = (stepIndex: number): boolean => {
    if (currentStepIndex === -1) return false;
    return stepIndex < currentStepIndex;
  };

  // Check if a step is active
  const isStepActive = (step: StepConfig): boolean => {
    return currentStep === step.id;
  };

  // Get the icon content for a step
  const getStepIcon = (step: StepConfig, index: number) => {
    if (isStepCompleted(index)) {
      return '✓';
    }
    if (isStepActive(step)) {
      return <Styled.StepIconInner />;
    }
    return '';
  };

  if (currentStep === 'success') return null;

  return (
    <Styled.StepsContainer>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const completed = isStepCompleted(index);
        const active = isStepActive(step);

        return (
          <Styled.StepWrapper key={step.id}>
            <Styled.StepItem $active={active} $completed={completed}>
              <Styled.StepIcon $active={active} $completed={completed}>
                {getStepIcon(step, index)}
              </Styled.StepIcon>
              <Styled.StepLabel $active={active}>
                {t(step.labelKey)}
              </Styled.StepLabel>
            </Styled.StepItem>
            {!isLast && <Styled.StepLine $completed={completed} />}
          </Styled.StepWrapper>
        );
      })}
    </Styled.StepsContainer>
  );
};
