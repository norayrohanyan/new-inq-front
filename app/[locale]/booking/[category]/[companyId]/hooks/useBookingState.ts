'use client';

import { useState, useMemo } from 'react';
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

  // Service handlers
  const handleServiceToggle = (service: any) => {
    const isSelected = selectedServices.some(s => s.id === service.id);
    if (isSelected) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, {
        id: service.id,
        name: service.name,
        price: service.price,
        duration: service.duration,
      }]);
    }
  };

  // Employee handlers
  const handleEmployeeSelect = (employee: any, preSelectedEmployeeId: string | null) => {
    if (preSelectedEmployeeId && employee.id === Number(preSelectedEmployeeId)) return;
    
    if (selectedEmployee?.id === employee.id) {
      // Deselecting current employee - clear additional services
      setSelectedEmployee(null);
      if (preSelectedServiceId) {
        const preSelectedService = selectedServices.find(s => s.id === Number(preSelectedServiceId));
        setSelectedServices(preSelectedService ? [preSelectedService] : []);
      }
    } else {
      // Switching to a new employee - clear additional services from previous employee
      if (preSelectedServiceId && selectedEmployee) {
        const preSelectedService = selectedServices.find(s => s.id === Number(preSelectedServiceId));
        setSelectedServices(preSelectedService ? [preSelectedService] : []);
      }
      setSelectedEmployee({
        id: employee.id,
        name: employee.name,
        imageUrl: employee.imageUrl || employee.avatar,
      });
    }
  };

  // Reset additional services (keep pre-selected)
  const resetAdditionalServices = () => {
    if (preSelectedServiceId) {
      const preSelectedService = selectedServices.find(s => s.id === Number(preSelectedServiceId));
      setSelectedServices(preSelectedService ? [preSelectedService] : []);
    } else {
      setSelectedServices([]);
    }
  };

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
    resetAdditionalServices,
  };
};

