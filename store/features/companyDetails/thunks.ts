import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { companyDetailsSlice } from './slice';

const companyDetailsActions = companyDetailsSlice.actions;

export const getCompanyDetailsThunk = createAsyncThunk(
  'companyDetails/getCompanyDetails',
  async ({ category, id }: { category: string; id: number }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(companyDetailsActions.setLoading(true));
      dispatch(companyDetailsActions.setError(null));

      const response = await apiService.getCompanyDetails(category, id);
      if (response.success && response.data) {
        dispatch(companyDetailsActions.setCompanyDetails(response.data));
        return response.data;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch company details'));
        return rejectWithValue(response.error || 'Failed to fetch company details');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(companyDetailsActions.setLoading(false));
    }
  }
);

export const getCompanyServicesThunk = createAsyncThunk(
  'companyDetails/getCompanyServices',
  async ({ category, id }: { category: string; id: number }, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiService.getCompanyServices(category, id);
      if (response.success && response.data) {
        // Check if data is paginated (has a 'data' property inside) or direct array
        const responseData = response.data as any;
        const servicesData = Array.isArray(responseData) ? responseData : (responseData.data || responseData);
        dispatch(companyDetailsActions.setServices(Array.isArray(servicesData) ? servicesData : []));
        return servicesData;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch services'));
        return rejectWithValue(response.error || 'Failed to fetch services');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getEmployeeServicesThunk = createAsyncThunk(
  'companyDetails/getEmployeeServices',
  async (
    { category, company_id, employee_id }: { category: string; company_id: number; employee_id?: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await apiService.getEmployeeServices({ category, company_id, employee_id });
      if (response.success && response.data) {
        const servicesData = Array.isArray(response.data) ? response.data : [];
        dispatch(companyDetailsActions.setServices(servicesData));
        return servicesData;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch employee services'));
        return rejectWithValue(response.error || 'Failed to fetch employee services');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getEmployeesByServiceThunk = createAsyncThunk(
  'companyDetails/getEmployeesByService',
  async (
    { category, company_id, service_id }: { category: string; company_id: number; service_id: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await apiService.getEmployeesByService({ category, company_id, service_id });
      if (response.success && response.data) {
        // Transform the response to match the employees format
        const employeesData = Array.isArray(response.data) ? response.data.map((emp: any) => ({
          id: emp.id,
          name: emp.name,
          image_url: emp.image_url,
          imageUrl: emp.image_url,
          rating: emp.rating,
          services: emp.services
        })) : [];
        dispatch(companyDetailsActions.setEmployees(employeesData));
        
        // Also extract and set the service info from the first employee's data
        if (employeesData.length > 0 && employeesData[0].services && employeesData[0].services.length > 0) {
          const serviceFromEmployee = employeesData[0].services.find((s: any) => s.id === service_id);
          if (serviceFromEmployee) {
            dispatch(companyDetailsActions.setServices([serviceFromEmployee]));
          }
        }
        
        return { employees: employeesData, service_id };
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch employees by service'));
        return rejectWithValue(response.error || 'Failed to fetch employees by service');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getCompanyEmployeesThunk = createAsyncThunk(
  'companyDetails/getCompanyEmployees',
  async ({ category, id }: { category: string; id: number }, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiService.getCompanyEmployees(category, id);
      if (response.success && response.data) {
        // Ensure data is always an array
        const employeesData = Array.isArray(response.data) ? response.data : [];
        dispatch(companyDetailsActions.setEmployees(employeesData));
        return employeesData;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch employees'));
        return rejectWithValue(response.error || 'Failed to fetch employees');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getCompanyPortfolioThunk = createAsyncThunk(
  'companyDetails/getCompanyPortfolio',
  async ({ category, id }: { category: string; id: number }, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiService.getCompanyPortfolio(category, id);
      if (response.success && response.data) {
        // Ensure data is always an array
        const portfolioData = Array.isArray(response.data) ? response.data : [];
        dispatch(companyDetailsActions.setPortfolio(portfolioData));
        return portfolioData;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch portfolio'));
        return rejectWithValue(response.error || 'Failed to fetch portfolio');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getApartmentDetailsThunk = createAsyncThunk(
  'companyDetails/getApartmentDetails',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(companyDetailsActions.setLoading(true));
      dispatch(companyDetailsActions.setError(null));

      const response = await apiService.getApartmentDetails(id);
      if (response.success && response.data) {
        dispatch(companyDetailsActions.setApartmentDetails(response.data));
        if (response.data.intervals) {
          dispatch(companyDetailsActions.setIntervals(response.data.intervals));
        }
        return response.data;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch apartment details'));
        return rejectWithValue(response.error || 'Failed to fetch apartment details');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(companyDetailsActions.setLoading(false));
    }
  }
);

export const getCarDetailsThunk = createAsyncThunk(
  'companyDetails/getCarDetails',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(companyDetailsActions.setLoading(true));
      dispatch(companyDetailsActions.setError(null));

      const response = await apiService.getCarDetails(id);
      if (response.success && response.data) {
        dispatch(companyDetailsActions.setCarDetails(response.data));
        if (response.data.intervals) {
          dispatch(companyDetailsActions.setIntervals(response.data.intervals));
        }
        return response.data;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch car details'));
        return rejectWithValue(response.error || 'Failed to fetch car details');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(companyDetailsActions.setLoading(false));
    }
  }
);

export const getApartmentIntervalsThunk = createAsyncThunk(
  'companyDetails/getApartmentIntervals',
  async (
    { id, startDate, append = false }: { id: number; startDate: string; append?: boolean },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(companyDetailsActions.setLoadingTimeSlots(true));
      const response = await apiService.getApartmentIntervals(id, startDate);
      if (response.success && response.data) {
        if (append) {
          dispatch(companyDetailsActions.appendIntervals(response.data));
        } else {
          dispatch(companyDetailsActions.setIntervals(response.data));
        }
        return response.data;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch intervals'));
        return rejectWithValue(response.error || 'Failed to fetch intervals');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(companyDetailsActions.setLoadingTimeSlots(false));
    }
  }
);

export const getCarIntervalsThunk = createAsyncThunk(
  'companyDetails/getCarIntervals',
  async (
    { id, startDate, append = false }: { id: number; startDate: string; append?: boolean },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(companyDetailsActions.setLoadingTimeSlots(true));
      const response = await apiService.getCarIntervals(id, startDate);
      if (response.success && response.data) {
        if (append) {
          dispatch(companyDetailsActions.appendIntervals(response.data));
        } else {
          dispatch(companyDetailsActions.setIntervals(response.data));
        }
        return response.data;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch intervals'));
        return rejectWithValue(response.error || 'Failed to fetch intervals');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(companyDetailsActions.setLoadingTimeSlots(false));
    }
  }
);

export const createApartmentBookingThunk = createAsyncThunk(
  'companyDetails/createApartmentBooking',
  async (
    booking: {
      id: number;
      check_in: string;
      check_out: string;
      guests_count: number;
      comment: string;
      guest?: {
        phone: string;
        name: string;
      };
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await apiService.createApartmentBooking(booking);
      if (response.success) {
        return response.data;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to create booking'));
        return rejectWithValue(response.error || 'Failed to create booking');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const createCarBookingThunk = createAsyncThunk(
  'companyDetails/createCarBooking',
  async (
    booking: {
      id: number;
      pickup_time: string;
      return_time: string;
      comment: string;
      guest?: {
        phone: string;
        name: string;
      };
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await apiService.createCarBooking(booking);
      if (response.success) {
        return response.data;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to create booking'));
        return rejectWithValue(response.error || 'Failed to create booking');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getBeautyIntervalsThunk = createAsyncThunk(
  'companyDetails/getBeautyIntervals',
  async (
    params: {
      company_id: number;
      service_ids: number[];
      employee_id?: number;
      day: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(companyDetailsActions.setLoadingTimeSlots(true));
      const response = await apiService.getBeautyIntervals(params);
      if (response.success && response.data) {
        dispatch(companyDetailsActions.setBeautyTimeSlots(response.data));
        return response.data;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch time slots'));
        return rejectWithValue(response.error || 'Failed to fetch time slots');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(companyDetailsActions.setLoadingTimeSlots(false));
    }
  }
);

export const createBeautyBookingThunk = createAsyncThunk(
  'companyDetails/createBeautyBooking',
  async (
    booking: {
      company_id: number;
      employee_id?: number;
      service_ids: number[];
      day: string;
      comment?: string;
      guest?: {
        phone: string;
        name: string;
      };
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await apiService.createBeautyBooking(booking);
      if (response.success) {
        return response.data;
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to create booking'));
        return rejectWithValue(response.error || 'Failed to create booking');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getCompanyReviewsThunk = createAsyncThunk(
  'companyDetails/getCompanyReviews',
  async (
    { category, id, page, perPage }: { category: string; id: number; page?: number; perPage?: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(companyDetailsActions.setLoadingReviews(true));
      const response = await apiService.getCompanyReviews(category, id, page, perPage);
      if (response.success && response.data) {
        const reviewsData = response.data.data || [];
        dispatch(companyDetailsActions.setReviews(reviewsData));
        
        // Set pagination data
        const pagination = {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
          first_page_url: response.data.first_page_url,
          last_page_url: response.data.last_page_url,
          next_page_url: response.data.next_page_url,
          prev_page_url: response.data.prev_page_url,
        };
        dispatch(companyDetailsActions.setReviewsPagination(pagination));
        
        return { reviews: reviewsData, pagination };
      } else {
        dispatch(companyDetailsActions.setError(response.error || 'Failed to fetch reviews'));
        return rejectWithValue(response.error || 'Failed to fetch reviews');
      }
    } catch (error: any) {
      dispatch(companyDetailsActions.setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(companyDetailsActions.setLoadingReviews(false));
    }
  }
);

