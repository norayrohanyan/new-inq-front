export interface IAd {
  id: number;
  company_id: number;
  category: string;
  url: string;
  desktop_image: string;
  mobile_image: string;
}

export interface IAdsState {
  ads: Record<string, IAd[]>; // Key is page_name, value is array of ads
  isLoading: Record<string, boolean>; // Key is page_name
  error: Record<string, string | null>; // Key is page_name
}
