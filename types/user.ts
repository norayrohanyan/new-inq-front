export interface IUserProfile {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
}

export interface IBooking {
  id: number;
  status: string;
  total_price: number;
  currency: string;
  created_at: string;
  comment?: string;
  category: string;
  company: ICompany;
  guest: IGuest;
  review?: IReview;
  can_cancel: boolean;
  // Different types of bookings have different fields
  [key: string]: any;
}

export interface IReview {
  id: number;
  rating: number;
  comment: string;
}

// Car Rental Booking Detail
export interface ICarBookingDetail extends IBooking {
  car_id: number;
  pickup_time: string;
  return_time: string;
  car: {
    id: number;
    name: string;
    address: string;
    rating: number;
    image_urls: string[];
  };
}

// Apartment Booking Detail
export interface IApartmentBookingDetail extends IBooking {
  apartment_id: number;
  guest_count: number;
  check_in: string;
  check_out: string;
  apartment: {
    id: number;
    name: string;
    address: string;
    rating: number;
    total_square: number;
    room_count: number;
    is_apartment: boolean;
    level: number;
    image_urls: string[];
  };
}

// Beauty Salon Booking Detail
export interface IBeautyBookingDetail extends IBooking {
  date: string;
  services: IBookingService[];
  employee?: {
    id: number;
    name: string;
    rating: number;
    image_url: string;
  };
}

export interface IBookingService {
  id: number;
  name: string;
  price?: number;
}

// Union type for all booking details
export type IBookingDetail = ICarBookingDetail | IApartmentBookingDetail | IBeautyBookingDetail;

export interface ICompany {
  id: number;
  name: string;
  address: string;
  phones: string[];
  logo: string;
  category: string;
  rating: number;
}

export interface IGuest {
  id: number;
  name: string;
  phone: string;
}

export interface IFavoriteCompany {
  id: number;
  name: string;
  address: string;
  rating: string;
  work_hours: string[];
  is_open: boolean;
  image_url: string | null;
  category: string;
  logo: string;
  phones: string[];
}

export interface IBookingHistory {
  booking_id: number;
  status: string;
  total_price: number;
  category: string;
  company_name: string;
  company_phone: string;
  company_logo: string;
  service_name: string;
  currency: string;
  date: string;
}

export interface IPaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
}

