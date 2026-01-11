import { ICompanyByService } from '@/store/types/companies';

export type BookingStep = 'company' | 'service' | 'employee' | 'datetime' | 'info' | 'success';

export interface SelectedService {
  id: number;
  name: string;
  price: number;
  duration?: string | number;
}

export interface SelectedEmployee {
  id: number;
  name: string;
  imageUrl?: string;
}

export interface BookingContextType {
  // Step management
  currentStep: BookingStep;
  setCurrentStep: (step: BookingStep) => void;
  
  // Company selection
  isFromService: boolean;
  selectedCompanyId: number | null;
  companiesByService: ICompanyByService[];
  isLoadingCompanies: boolean;
  handleCompanySelect: (company: ICompanyByService) => void;
  
  // Service selection
  services: any[];
  additionalServices: any[];
  selectedServices: SelectedService[];
  handleServiceToggle: (service: any) => void;
  preSelectedServiceId: string | null;
  
  // Employee selection
  employees: any[];
  availableEmployees: any[];
  selectedEmployee: SelectedEmployee | null;
  handleEmployeeSelect: (employee: any) => void;
  preSelectedEmployeeId: string | null;
  hasEmployees: boolean;
  
  // DateTime selection
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  beautyTimeSlots: Array<{ start: string; end: string }>;
  isLoadingTimeSlots: boolean;
  availableIntervals: Record<string, any>;
  
  // Booking info
  bookingForOther: boolean;
  setBookingForOther: (value: boolean) => void;
  guestName: string;
  setGuestName: (value: string) => void;
  guestPhone: string;
  setGuestPhone: (value: string) => void;
  comments: string;
  setComments: (value: string) => void;
  
  // Calculations
  totalPrice: number;
  totalDuration: number;
  
  // Navigation
  handleContinue: () => void;
  handleBack: () => void;
  canContinue: () => boolean;
  canGoBack: () => boolean;
  isSubmitting: boolean;
  
  // Company details
  companyDetails: any;
  
  // Template config
  templateConfig: any;
}

