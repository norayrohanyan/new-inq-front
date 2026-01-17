/**
 * Category Template System
 * 
 * Defines which template each category type uses for detail pages.
 * This allows similar categories to share the same UI/reservation flow.
 */

export type CategoryTemplate = 'rental' | 'service';

export interface CategoryTemplateConfig {
  template: CategoryTemplate;
  features: {
    hasEmployees?: boolean;
    hasPortfolio?: boolean;
    hasServices?: boolean;
    hasReviews?: boolean;
    hasReservationForm?: boolean;
    hasBookingFlow?: boolean; // For future separate booking pages
  };
}

/**
 * Template configuration for each category
 * NOTE: Use the exact category slug as returned by the API
 */
export const CATEGORY_TEMPLATES: Record<string, CategoryTemplateConfig> = {
  // RENTAL TEMPLATE - Direct booking with date pickers
  'car_rental': {
    template: 'rental',
    features: {
      hasReservationForm: true,
      hasBookingFlow: false,
    },
  },
  'apartment_rental': {
    template: 'rental',
    features: {
      hasReservationForm: true,
      hasBookingFlow: false,
    },
  },
  
  // SERVICE TEMPLATE - Company profile with services/employees
  'beauty_salon': {
    template: 'service',
    features: {
      hasServices: true,
      hasEmployees: true,
      hasPortfolio: true,
      hasReviews: true,
      hasBookingFlow: true, // Will use separate reservation page
    },
  },
  'animal_care': {
    template: 'service',
    features: {
      hasServices: true,
      hasEmployees: true,
      hasPortfolio: true,
      hasReviews: true,
      hasBookingFlow: true,
    },
  },
  'medical': {
    template: 'service',
    features: {
      hasServices: true,
      hasEmployees: true,
      hasPortfolio: true,
      hasReviews: true,
      hasBookingFlow: true,
    },
  },
  'photo_studio': {
    template: 'service',
    features: {
      hasServices: true,
      hasEmployees: true,
      hasPortfolio: true,
      hasReviews: true,
      hasBookingFlow: true,
    },
  },
  'car_wash': {
    template: 'service',
    features: {
      hasServices: true,
      hasEmployees: false,
      hasPortfolio: true,
      hasReviews: true,
      hasBookingFlow: true,
    },
  },
  'car_maintenance': {
    template: 'service',
    features: {
      hasServices: true,
      hasEmployees: false,
      hasPortfolio: true,
      hasReviews: true,
      hasBookingFlow: true,
    },
  },
};

/**
 * Get template configuration for a category
 */
export function getCategoryTemplate(categorySlug: string): CategoryTemplateConfig | null {
  return CATEGORY_TEMPLATES[categorySlug] || null;
}

/**
 * Check if category uses rental template
 */
export function isRentalCategory(categorySlug: string): boolean {
  return getCategoryTemplate(categorySlug)?.template === 'rental';
}

/**
 * Check if category uses service template
 */
export function isServiceCategory(categorySlug: string): boolean {
  return getCategoryTemplate(categorySlug)?.template === 'service';
}

