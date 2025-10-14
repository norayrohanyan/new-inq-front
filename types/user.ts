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
  // Different types of bookings have different fields
  [key: string]: any;
}

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
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
}

