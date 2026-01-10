import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  IApiResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  ILinkVerifyResponse,
} from '@/types/auth';
import { ICategory } from '@/types/categories';
import {
  IUserProfile,
  IBooking,
  IFavoriteCompany,
  IBookingHistory,
  IPaginatedResponse,
} from '@/types/user';
import { ICompany } from '@/store/types/companies';
import { IService } from '@/store/types/services';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Helper to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

// Request interceptor - add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from cookies
    if (typeof window !== 'undefined') {
      const accessToken = getCookie('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      if (typeof window !== 'undefined') {
        // Clear auth data
        localStorage.removeItem('auth_tokens');
        // Optionally redirect to login
        // window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * API Service using axios
 */
export const apiService = {
  /**
   * User login
   */
  async login(credentials: ILoginRequest): Promise<IApiResponse<ILoginResponse>> {
    try {
      const { data } = await api.post<IApiResponse<ILoginResponse>>(
        '/api/login',
        credentials
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * User registration
   */
  async register(userData: IRegisterRequest): Promise<IApiResponse<null>> {
    try {
      const { data } = await api.post<IApiResponse<null>>(
        '/api/register',
        userData
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Refresh access token
   */
  async refreshTokens(refreshToken: string): Promise<IApiResponse<ILoginResponse>> {
    try {
      const { data } = await api.get<IApiResponse<ILoginResponse>>(
        '/api/tokens',
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Verify link (email/phone verification or password reset)
   */
  async verifyLink(hash: string): Promise<IApiResponse<ILinkVerifyResponse>> {
    try {
      const { data } = await api.get<IApiResponse<ILinkVerifyResponse>>(
        `/api/link-verify`,
        {
          params: { hash },
        }
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get user profile
   */
  async getUserProfile(accessToken?: string): Promise<IApiResponse<any>> {
    try {
      const config = accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {};
      const { data } = await api.get<IApiResponse<any>>('/api/user', config);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<IApiResponse<ICategory[]>> {
    try {
      const { data } = await api.get<IApiResponse<ICategory[]>>('/api/categories');
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get paginated list of companies by category
   */
  async getCompanies(params: {
    category: string;
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
    filters?: Record<string, any>;
  }): Promise<IApiResponse<IPaginatedResponse<ICompany>>> {
    try {
      const { category, ...queryParams } = params;
      const { data } = await api.get<IApiResponse<IPaginatedResponse<ICompany>>>(
        `/api/${category}/companies`,
        { params: queryParams }
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get paginated list of services by category
   */
  async getServices(params: {
    category: string;
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
    filters?: Record<string, any>;
  }): Promise<IApiResponse<IPaginatedResponse<IService>>> {
    try {
      const { category, ...queryParams} = params;
      const { data } = await api.get<IApiResponse<IPaginatedResponse<IService>>>(
        `/api/${category}/services`,
        { params: queryParams }
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get filters for companies by category
   */
  async getCompaniesFilters(category: string): Promise<IApiResponse<Record<string, any>>> {
    try {
      const { data } = await api.get<IApiResponse<Record<string, any>>>(
        `/api/${category}/companies/filters`
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get filters for services by category
   */
  async getServicesFilters(category: string): Promise<IApiResponse<Record<string, any>>> {
    try {
      const { data } = await api.get<IApiResponse<Record<string, any>>>(
        `/api/${category}/services/filters`
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * User logout
   */
  async logout(): Promise<IApiResponse<null>> {
    try {
      const { data } = await api.post<IApiResponse<null>>('/api/user/logout');
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get specific booking
   * Note: API can return either a single booking object or an array
   */
  async getBooking(bookingId: number, category: string): Promise<IApiResponse<IBooking | IBooking[]>> {
    try {
      const { data } = await api.get<IApiResponse<IBooking | IBooking[]>>('/api/user/booking', {
        params: { booking_id: bookingId, category },
      });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get booking history (paginated)
   */
  async getBookingHistory(params: {
    active: boolean;
    category?: string;
    page?: number;
    per_page?: number;
  }): Promise<IApiResponse<IPaginatedResponse<IBookingHistory>>> {
    try {
      const { data } = await api.get<IApiResponse<IPaginatedResponse<IBookingHistory>>>(
        '/api/user/booking/history',
        { params }
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Cancel user booking
   */
  async cancelBooking(bookingId: number, category: string): Promise<IApiResponse<null>> {
    try {
      const { data } = await api.post<IApiResponse<null>>('/api/user/booking/cancel', {
        booking_id: bookingId,
        category,
      });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Submit review for a booking
   */
  async submitReview(params: {
    booking_id: number;
    category: string;
    rating: number;
    comment: string;
  }): Promise<IApiResponse<null>> {
    try {
      const { data } = await api.post<IApiResponse<null>>('/api/user/booking/review', params);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get user favorite companies
   */
  async getFavorites(): Promise<IApiResponse<IFavoriteCompany[]>> {
    try {
      const { data } = await api.get<IApiResponse<IFavoriteCompany[]>>('/api/user/favorites/');
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Add favorite company
   */
  async addFavorite(clientId: number, category: string): Promise<IApiResponse<null>> {
    try {
      const { data } = await api.post<IApiResponse<null>>('/api/user/favorites/', {
        client_id: clientId,
        category,
      });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Delete favorite company
   */
  async deleteFavorite(clientId: number, category: string): Promise<IApiResponse<null>> {
    try {
      const { data } = await api.delete<IApiResponse<null>>('/api/user/favorites/', {
        data: { client_id: clientId, category },
      });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Edit user profile
   */
  async editProfile(userData: {
    first_name: string;
    last_name: string;
  }): Promise<IApiResponse<IUserProfile>> {
    try {
      const { data } = await api.put<IApiResponse<IUserProfile>>('/api/user/edit', userData);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Update phone number
   */
  async updatePhone(phone: string): Promise<IApiResponse<null>> {
    try {
      const { data } = await api.patch<IApiResponse<null>>('/api/user/phone', { phone });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Forgot password
   */
  async forgotPassword(phone: string, url: string): Promise<IApiResponse<null>> {
    try {
      const { data } = await api.post<IApiResponse<null>>('/api/password/forgot', {
        phone,
        url,
      });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Update password
   */
  async updatePassword(password: string): Promise<IApiResponse<null>> {
    try {
      const { data } = await api.patch<IApiResponse<null>>('/api/password', { password });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get company details
   */
  async getCompanyDetails(category: string, id: number): Promise<IApiResponse<any>> {
    try {
      const { data } = await api.get<IApiResponse<any>>(`/api/${category}/company/${id}`);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get company employees
   */
  async getCompanyEmployees(category: string, id: number): Promise<IApiResponse<any[]>> {
    try {
      const { data } = await api.get<IApiResponse<any[]>>(`/api/${category}/company/${id}/employees`);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get company portfolio
   */
  async getCompanyPortfolio(category: string, id: number): Promise<IApiResponse<string[]>> {
    try {
      const { data } = await api.get<IApiResponse<string[]>>(`/api/${category}/company/${id}/portfolio`);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get company services
   */
  async getCompanyServices(category: string, id: number): Promise<IApiResponse<any[]>> {
    try {
      const { data } = await api.get<IApiResponse<any[]>>(`/api/${category}/company/${id}/services`);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get apartment details with intervals
   */
  async getApartmentDetails(id: number): Promise<IApiResponse<any>> {
    try {
      const { data } = await api.get<IApiResponse<any>>(`/api/apartment`, {
        params: { id },
      });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get apartment intervals
   */
  async getApartmentIntervals(id: number, startDate: string): Promise<IApiResponse<Record<string, any>>> {
    try {
      const { data } = await api.get<IApiResponse<Record<string, any>>>(`/api/apartment/intervals`, {
        params: { id, start_date: startDate },
      });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Create apartment booking
   */
  async createApartmentBooking(booking: {
    id: number;
    check_in: string;
    check_out: string;
    guests_count: number;
    comment: string;
    guest: {
      phone: string;
      name: string;
    };
  }): Promise<IApiResponse<any>> {
    try {
      const { data } = await api.post<IApiResponse<any>>(`/api/apartment/booking`, booking);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get car details with intervals
   */
  async getCarDetails(id: number): Promise<IApiResponse<any>> {
    try {
      const { data } = await api.get<IApiResponse<any>>(`/api/car`, {
        params: { id },
      });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get car intervals
   */
  async getCarIntervals(id: number, startDate: string): Promise<IApiResponse<Record<string, any>>> {
    try {
      const { data } = await api.get<IApiResponse<Record<string, any>>>(`/api/car/intervals`, {
        params: { id, start_date: startDate },
      });
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Create car booking
   */
  async createCarBooking(booking: {
    id: number;
    pickup_time: string;
    return_time: string;
    comment: string;
    guest: {
      phone: string;
      name: string;
    };
  }): Promise<IApiResponse<any>> {
    try {
      const { data } = await api.post<IApiResponse<any>>(`/api/car/booking`, booking);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get beauty salon intervals (available time slots for a specific date)
   */
  async getBeautyIntervals(params: {
    company_id: number;
    service_ids: number[];
    employee_id?: number;
    day: string; // Format: YYYY-MM-DD
  }): Promise<IApiResponse<Array<{ start: string; end: string }>>> {
    try {
      const { data } = await api.get<IApiResponse<Array<{ start: string; end: string }>>>(
        `/api/beauty_salon/intervals`,
        { params }
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Create beauty salon booking
   */
  async createBeautyBooking(booking: {
    company_id: number;
    employee_id?: number;
    service_ids: number[];
    day: string; // Format: YYYY-MM-DD HH:mm
    comment?: string;
    guest?: {
      phone: string;
      name: string;
    };
  }): Promise<IApiResponse<{ id: number; category: string }>> {
    try {
      const { data } = await api.post<IApiResponse<{ id: number; category: string }>>(
        `/api/beauty_salon/booking`,
        booking
      );
      return data;
    } catch (error) {
      return handleError(error);
    }
  },
};

/**
 * Handle axios errors and return standardized response
 */
function handleError<T>(error: unknown): IApiResponse<T> {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<IApiResponse<T>>;
    
    // If server returned an error response
    if (axiosError.response?.data) {
      return axiosError.response.data;
    }
    
    // Network or other errors
    return {
      success: false,
      data: null as T,
      error: axiosError.message || 'Network error occurred',
    };
  }
  
  // Unknown error
  return {
    success: false,
    data: null as T,
    error: error instanceof Error ? error.message : 'Unknown error occurred',
  };
}

// Export axios instance for direct use if needed
export { api };
