import { isRentalCategory } from '@/consts/categoryTemplates';

interface ShareUrlParams {
  locale: string;
  category: string;
  id: number;
  isCompany?: boolean;
  serviceId?: number;
}

/**
 * Builds a shareable URL for a company, service, or rental item
 * @param params - Object containing locale, category, id, and optional flags
 * @returns Full URL string with origin and path
 */
export const getShareUrl = (params: ShareUrlParams): string => {
  const { locale, category, id, isCompany = true, serviceId } = params;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const isRental = isRentalCategory(category);

  if (isCompany) {
    if (isRental) {
      // Rental companies go to their inventory page
      return `${baseUrl}/${locale}/categories/${category}/company/${id}`;
    } else {
      // Service companies go to their detail page
      return `${baseUrl}/${locale}/detail/${category}/${id}`;
    }
  } else {
    if (isRental) {
      // Rental items (apartments, cars) go to detail page
      return `${baseUrl}/${locale}/detail/${category}/${id}`;
    } else {
      // Services go to booking page with service ID
      return `${baseUrl}/${locale}/booking/${category}/0?serviceId=${serviceId || id}`;
    }
  }
};

/**
 * Builds a simple detail page URL
 * @param locale - Current locale (e.g., 'en', 'ru')
 * @param category - Category slug
 * @param id - Item ID
 * @returns Full URL string with origin and path
 */
export const getDetailUrl = (locale: string, category: string, id: number): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/${locale}/detail/${category}/${id}`;
};
