'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  getCompanyDetailsThunk,
  getCompanyServicesThunk,
  getEmployeeServicesThunk,
  getEmployeesByServiceThunk,
  getCompanyEmployeesThunk,
  getBeautyIntervalsThunk,
  getCompaniesByServiceThunk,
  companyDetailsSelectors,
  companyDetailsActions,
  companiesSelectors,
  companiesActions,
} from '@/store';
import { BookingStep, SelectedService, SelectedEmployee } from '../components/types';

interface UseBookingDataProps {
  category: string;
  companyId: number;
  isFromService: boolean;
  preSelectedServiceId: string | null;
  preSelectedEmployeeId: string | null;
  hasEmployees: boolean;
  currentStep: BookingStep;
  selectedServices: SelectedService[];
  selectedEmployee: SelectedEmployee | null;
  selectedDate: string | null;
}

export const useBookingData = ({
  category,
  companyId,
  isFromService,
  preSelectedServiceId,
  preSelectedEmployeeId,
  hasEmployees,
  currentStep,
  selectedServices,
  selectedEmployee,
  selectedDate,
}: UseBookingDataProps) => {
  const dispatch = useAppDispatch();
  const fetchedCompanyRef = useRef<number | null>(null);

  // Redux selectors
  const companyDetails = useAppSelector(companyDetailsSelectors.companyDetails);
  const services = useAppSelector(companyDetailsSelectors.services) || [];
  const employees = useAppSelector(companyDetailsSelectors.employees) || [];
  const isLoading = useAppSelector(companyDetailsSelectors.isLoading);
  const beautyTimeSlots = useAppSelector(companyDetailsSelectors.beautyTimeSlots) || [];
  const isLoadingTimeSlots = useAppSelector(companyDetailsSelectors.isLoadingTimeSlots);
  const availableIntervals = useAppSelector(companyDetailsSelectors.intervals) || {};

  // Companies by service
  const companiesByService = useAppSelector(companiesSelectors.companiesByService) || [];
  const isLoadingCompanies = useAppSelector(companiesSelectors.isLoadingCompaniesByService) || false;

  // Available employees (excluding pre-selected)
  const availableEmployees = useMemo(() => {
    if (preSelectedEmployeeId && employees) {
      return employees.filter((emp: any) => emp.id !== Number(preSelectedEmployeeId));
    }
    return employees;
  }, [preSelectedEmployeeId, employees]);

  // Additional services from selected employee
  const additionalServices = useMemo(() => {
    if (!preSelectedServiceId) {
      return services;
    }
    
    if (!selectedEmployee) {
      return [];
    }
    
    const employee = employees.find((emp: any) => emp.id === selectedEmployee.id) as any;
    if (!employee || !employee.services || !Array.isArray(employee.services)) {
      return [];
    }
    
    const employeeServices = (employee.services as any[]).filter(
      (service: any) => service.id !== Number(preSelectedServiceId)
    );
    
    const uniqueServices = new Map<number, any>();
    employeeServices.forEach((service: any) => {
      if (!uniqueServices.has(service.id)) {
        uniqueServices.set(service.id, service);
      }
    });
    
    return Array.from(uniqueServices.values());
  }, [preSelectedServiceId, selectedEmployee, employees, services]);

  // Fetch companies by service
  useEffect(() => {
    if (isFromService && preSelectedServiceId) {
      dispatch(getCompaniesByServiceThunk({
        category,
        service_id: Number(preSelectedServiceId),
        page: 1,
        per_page: 50,
      }));
    }
    
    return () => {
      if (isFromService) {
        dispatch(companiesActions.clearCompaniesByService());
      }
    };
  }, [isFromService, preSelectedServiceId, category, dispatch]);

  // Fetch company data
  useEffect(() => {
    if (!companyId || !category) return;
    
    if (fetchedCompanyRef.current === companyId) return;
    fetchedCompanyRef.current = companyId;
    
    dispatch(companyDetailsActions.clearCompanyDetails());
    dispatch(getCompanyDetailsThunk({ category, id: companyId }));
    
    if (preSelectedEmployeeId) {
      dispatch(getEmployeeServicesThunk({
        category,
        company_id: companyId,
        employee_id: Number(preSelectedEmployeeId),
      }));
    } else if (preSelectedServiceId) {
      if (hasEmployees) {
        dispatch(getEmployeesByServiceThunk({
          category,
          company_id: companyId,
          service_id: Number(preSelectedServiceId),
        }));
      }
    } else {
      dispatch(getCompanyServicesThunk({ category, id: companyId }));
      if (hasEmployees) {
        dispatch(getCompanyEmployeesThunk({ category, id: companyId }));
      }
    }
  }, [companyId, category, preSelectedEmployeeId, preSelectedServiceId, dispatch, hasEmployees]);

  // Fetch employees by service when moving to employee step
  useEffect(() => {
    if (currentStep === 'employee' && selectedServices.length > 0 && companyId && !preSelectedEmployeeId && !preSelectedServiceId) {
      dispatch(getEmployeesByServiceThunk({
        category,
        company_id: companyId,
        service_id: selectedServices[0].id,
      }));
    }
  }, [currentStep, selectedServices, companyId, preSelectedEmployeeId, preSelectedServiceId, category, dispatch]);

  // Fetch time slots
  useEffect(() => {
    if (selectedDate && selectedServices.length > 0 && companyId) {
      dispatch(getBeautyIntervalsThunk({
        company_id: companyId,
        service_ids: selectedServices.map(s => s.id),
        day: selectedDate,
        ...(selectedEmployee && { employee_id: selectedEmployee.id }),
      }));
    }
  }, [selectedDate, selectedServices, companyId, selectedEmployee, dispatch]);

  // Generate calendar intervals
  useEffect(() => {
    if (currentStep === 'datetime' && companyId && selectedServices.length > 0) {
      const intervals: Record<string, any> = {};
      const today = new Date();
      
      for (let i = 0; i < 60; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const isAvailable = date.getDay() !== 0;
        intervals[dateString] = { date: dateString, available: isAvailable, discounted: false };
      }
      
      dispatch(companyDetailsActions.setIntervals(intervals));
    }
  }, [currentStep, companyId, selectedServices, dispatch]);

  return {
    // Company
    companyDetails,
    isLoading,
    
    // Services
    services,
    additionalServices,
    
    // Employees
    employees,
    availableEmployees,
    
    // Time slots
    beautyTimeSlots,
    isLoadingTimeSlots,
    availableIntervals,
    
    // Companies by service
    companiesByService,
    isLoadingCompanies,
  };
};

