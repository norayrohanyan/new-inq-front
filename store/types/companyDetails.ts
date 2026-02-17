/**
 * Company details types for single company page
 */

export interface IDiscount {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  percentage: number;
}

export interface ICompanyDetails {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: string;
  description: string;
  phones: string[];
  work_hours: {
    Sunday: string[] | null;
    Monday: string[] | null;
    Tuesday: string[] | null;
    Wednesday: string[] | null;
    Thursday: string[] | null;
    Friday: string[] | null;
    Saturday: string[] | null;
  };
  external_links?: Record<string, string>;
  logo: string;
  banner_urls: {
    desktop_image: string;
    mobile_image: string;
  };
  is_individual?: boolean;
}

export interface IEmployee {
  id: number;
  name: string;
  rating: string;
  profession: string;
  image_url: string;
}

export interface IPortfolioImage {
  url: string;
}

export interface IApartmentDetails {
  id: number;
  name: string;
  company_id: number;
  company_name: string;
  price: number;
  rating: number;
  address: string;
  longitude: number;
  latitude: number;
  total_square: number;
  room_count: number;
  is_apartment: boolean;
  level: number;
  check_in: string;
  check_out: string;
  currency: string;
  description: string;
  image_urls: string[];
  discount: IDiscount | null;
  intervals: Record<string, IInterval>;
}

export interface ICarDetails {
  id: number;
  name: string;
  company_name: string;
  price: number;
  currency: string;
  rent_time: string;
  rating: number;
  discount: IDiscount | null;
  image_urls: string[];
  body: Array<{ title: string; data: string }>;
  gear: Array<{ title: string; data: string }>;
  motor: Array<{ title: string; data: string }>;
  fuel: Array<{ title: string; data: string }>;
  expense: Array<{ title: string; data: string }>;
  seats: Array<{ title: string; data: string }>;
  isLeftWheel: Array<{ title: string; data: string }>;
  hasAirConditioner: Array<{ title: string; data: string }>;
  intervals: Record<string, IInterval>;
}

export interface IInterval {
  date: string;
  total_price: number;
  price: number;
  available: boolean;
  discounted: boolean;
}

export interface IServiceDetails {
  id: number;
  name: string;
  company_id: number;
  company_name: string;
  total_price?: number;
  price: number;
  rating: number;
  address: string;
  longitude: number;
  latitude: number;
  image_urls: string[];
  discount: IDiscount | null;
  description?: string;
}

export interface IApartmentBooking {
  id: number;
  check_in: string;
  check_out: string;
  guests_count: number;
  comment: string;
  guest: {
    phone: string;
    name: string;
  };
}

export interface ICarBooking {
  id: number;
  pickup_time: string;
  return_time: string;
  comment: string;
  guest: {
    phone: string;
    name: string;
  };
}

export interface IBookingResponse {
  id: number;
  status: string;
  user_id: number;
  user_phone: string;
  user_name: string;
  total_price: number;
  currency: string;
  created_at: string;
  comment: string;
}

export interface IBeautyTimeSlot {
  start: string;
  end: string;
}

export interface IBeautyBooking {
  company_id: number;
  employee_id?: number;
  service_ids: number[];
  day: string; // Format: YYYY-MM-DD HH:mm
  comment?: string;
  guest?: {
    phone: string;
    name: string;
  };
}

export interface IReview {
  id: number;
  rating: number;
  comment: string;
  user_name: string;
}

export interface IReviewsPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export interface ICompanyDetailsState {
  companyDetails: ICompanyDetails | null;
  apartmentDetails: IApartmentDetails | null;
  carDetails: ICarDetails | null;
  services: IServiceDetails[];
  employees: IEmployee[];
  portfolio: string[];
  intervals: Record<string, IInterval>;
  beautyTimeSlots: IBeautyTimeSlot[];
  reviews: IReview[];
  reviewsPagination: IReviewsPagination | null;
  isLoadingIntervals: boolean;
  isLoadingTimeSlots: boolean;
  isLoadingReviews: boolean;
  isLoading: boolean;
  error: string | null;
}


