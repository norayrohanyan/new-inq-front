export interface INearMeCompany {
  id: number;
  name: string;
  logo?: string;
  image_url?: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  is_open?: boolean;
  rating: number | string | null;
  distance?: number;
}

export interface INearMeParams {
  category: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export interface INearMeState {
  companies: INearMeCompany[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  selectedLocation: {
    latitude: number;
    longitude: number;
  } | null;
  radius: number;
  locationPermission: 'granted' | 'denied' | 'prompt' | null;
}
