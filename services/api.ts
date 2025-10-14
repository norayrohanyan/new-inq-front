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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_tokens');
      if (token) {
        try {
          const { accessToken } = JSON.parse(token);
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } catch (error) {
          console.error('Error parsing auth token:', error);
        }
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
   */
  async getBooking(bookingId: number, category: string): Promise<IApiResponse<IBooking[]>> {
    try {
      const { data } = await api.get<IApiResponse<IBooking[]>>('/api/user/booking', {
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
