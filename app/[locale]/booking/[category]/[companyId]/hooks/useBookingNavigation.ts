'use client';

import { useCallback } from 'react';
import { BookingStep } from '../components/types';

interface UseBookingNavigationProps {
  currentStep: BookingStep;
  setCurrentStep: (step: BookingStep) => void;
  isFromService: boolean;
  preSelectedServiceId: string | null;
  preSelectedEmployeeId: string | null;
  hasEmployees: boolean;
  availableEmployeesCount: number;
  selectedServicesCount: number;
  selectedCompanyId: number | null;
  selectedDate: string | null;
  selectedTime: string;
  bookingForOther: boolean;
  guestName: string;
  guestPhone: string;
}

export const useBookingNavigation = ({
  currentStep,
  setCurrentStep,
  isFromService,
  preSelectedServiceId,
  preSelectedEmployeeId,
  hasEmployees,
  availableEmployeesCount,
  selectedServicesCount,
  selectedCompanyId,
  selectedDate,
  selectedTime,
  bookingForOther,
  guestName,
  guestPhone,
}: UseBookingNavigationProps) => {
  
  // Get the next step based on current step and what's pre-selected
  const getNextStep = useCallback((current: BookingStep): BookingStep | null => {
    switch (current) {
      case 'company':
        if (!preSelectedServiceId) return 'service';
        if (hasEmployees && !preSelectedEmployeeId) return 'employee';
        return 'datetime';
      case 'service':
        if (hasEmployees && !preSelectedEmployeeId && availableEmployeesCount > 0) return 'employee';
        return 'datetime';
      case 'employee':
        return 'datetime';
      case 'datetime':
        return 'info';
      case 'info':
        return null; // Submit instead
      default:
        return null;
    }
  }, [preSelectedServiceId, preSelectedEmployeeId, hasEmployees, availableEmployeesCount]);

  // Get the previous step based on current step and what's pre-selected
  const getPreviousStep = useCallback((current: BookingStep): BookingStep | null => {
    switch (current) {
      case 'info':
        return 'datetime';
      case 'datetime':
        if (hasEmployees && !preSelectedEmployeeId) return 'employee';
        if (!preSelectedServiceId) return 'service';
        if (isFromService) return 'company';
        return null;
      case 'employee':
        if (!preSelectedServiceId) return 'service';
        if (isFromService) return 'company';
        return null;
      case 'service':
        if (isFromService) return 'company';
        return null;
      case 'company':
        return null;
      default:
        return null;
    }
  }, [isFromService, preSelectedServiceId, preSelectedEmployeeId, hasEmployees]);

  const handleContinue = useCallback((onSubmit?: () => void) => {
    if (currentStep === 'info') {
      onSubmit?.();
      return;
    }
    
    const nextStep = getNextStep(currentStep);
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  }, [currentStep, getNextStep, setCurrentStep]);

  const handleBack = useCallback(() => {
    const prevStep = getPreviousStep(currentStep);
    if (prevStep) {
      setCurrentStep(prevStep);
    }
  }, [currentStep, getPreviousStep, setCurrentStep]);

  const canGoBack = useCallback((): boolean => {
    return getPreviousStep(currentStep) !== null;
  }, [currentStep, getPreviousStep]);

  const canContinue = useCallback((): boolean => {
    switch (currentStep) {
      case 'company':
        return selectedCompanyId !== null;
      case 'service':
        return selectedServicesCount > 0;
      case 'employee':
        return true; // Employee selection is optional
      case 'datetime':
        return !!(selectedDate && selectedTime);
      case 'info':
        if (bookingForOther) {
          return guestName.trim().length > 0 && guestPhone.trim().length > 0;
        }
        return true;
      default:
        return false;
    }
  }, [currentStep, selectedCompanyId, selectedServicesCount, selectedDate, selectedTime, bookingForOther, guestName, guestPhone]);

  return {
    getNextStep,
    getPreviousStep,
    handleContinue,
    handleBack,
    canGoBack,
    canContinue,
  };
};

