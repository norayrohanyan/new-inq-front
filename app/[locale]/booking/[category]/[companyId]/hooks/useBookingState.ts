'use client';

import { useState, useMemo, useCallback } from 'react';
import { BookingStep, SelectedService, SelectedEmployee } from '../components/types';

interface UseBookingStateProps {
  isFromService: boolean;
  preSelectedServiceId: string | null;
}

export const useBookingState = ({ isFromService, preSelectedServiceId }: UseBookingStateProps) => {
  // Company selection
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);

  // Booking state
  const [currentStep, setCurrentStep] = useState<BookingStep>(isFromService ? 'company' : 'service');
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<SelectedEmployee | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Guest booking
  const [bookingForOther, setBookingForOther] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [comments, setComments] = useState('');

  // Calculations
  const totalPrice = useMemo(() =>
    selectedServices.reduce((sum, service) => sum + service.price, 0),
    [selectedServices]
  );

  const totalDuration = useMemo(() =>
    selectedServices.reduce((sum, service) => {
      if (!service.duration) return sum;
      if (typeof service.duration === 'number') {
        return sum + service.duration;
      }
      const durationMatch = String(service.duration).match(/(\d+)/);
      return sum + (durationMatch ? parseInt(durationMatch[0]) : 0);
    }, 0),
    [selectedServices]
  );

  // Service handlers - functional updater prevents stale closure on rapid clicks
  const handleServiceToggle = useCallback((service: any) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.id === service.id);
      if (isSelected) {
        return prev.filter(s => s.id !== service.id);
      }
      return [...prev, {
        id: service.id,
        name: service.name,
        price: service.price,
        duration: service.duration,
      }];
    });
  }, []);

  // Employee handlers - functional updater prevents stale closure
  const handleEmployeeSelect = useCallback((employee: any, preSelectedEmployeeId: string | null) => {
    if (preSelectedEmployeeId && employee.id === Number(preSelectedEmployeeId)) return;

    setSelectedEmployee(prev => {
      if (prev?.id === employee.id) {
        // Deselecting current employee - clear additional services
        if (preSelectedServiceId) {
          setSelectedServices(services => {
            const preSelected = services.find(s => s.id === Number(preSelectedServiceId));
            return preSelected ? [preSelected] : [];
          });
        }
        return null;
      }

      // Switching to a new employee - clear additional services from previous employee
      if (preSelectedServiceId && prev) {
        setSelectedServices(services => {
          const preSelected = services.find(s => s.id === Number(preSelectedServiceId));
          return preSelected ? [preSelected] : [];
        });
      }

      return {
        id: employee.id,
        name: employee.name,
        imageUrl: employee.imageUrl || employee.avatar,
      };
    });
  }, [preSelectedServiceId]);

  // Clear time when date changes - stale time slots from previous date shouldn't persist
  const handleDateChange = useCallback((date: string | null) => {
    setSelectedDate(date);
    setSelectedTime('');
  }, []);

  // Reset state for a specific step (used when navigating back)
  const resetStepState = useCallback((step: BookingStep) => {
    switch (step) {
      case 'info':
        setBookingForOther(false);
        setGuestName('');
        setGuestPhone('');
        setComments('');
        break;
      case 'datetime':
        setSelectedDate(null);
        setSelectedTime('');
        break;
      case 'employee':
        setSelectedEmployee(null);
        if (preSelectedServiceId) {
          setSelectedServices(services => {
            const preSelected = services.find(s => s.id === Number(preSelectedServiceId));
            return preSelected ? [preSelected] : [];
          });
        }
        break;
      case 'service':
        setSelectedServices([]);
        setSelectedEmployee(null);
        setSelectedDate(null);
        setSelectedTime('');
        break;
    }
  }, [preSelectedServiceId]);

  return {
    // Company
    selectedCompanyId,
    setSelectedCompanyId,

    // Step
    currentStep,
    setCurrentStep,

    // Services
    selectedServices,
    setSelectedServices,
    handleServiceToggle,
    totalPrice,
    totalDuration,

    // Employee
    selectedEmployee,
    setSelectedEmployee,
    handleEmployeeSelect,

    // DateTime
    selectedDate,
    setSelectedDate,
    handleDateChange,
    selectedTime,
    setSelectedTime,

    // Guest
    bookingForOther,
    setBookingForOther,
    guestName,
    setGuestName,
    guestPhone,
    setGuestPhone,
    comments,
    setComments,

    // Status
    isInitialized,
    setIsInitialized,
    isSubmitting,
    setIsSubmitting,

    // Utils
    resetStepState,
  };
};
