/**
 * Phone number formatting utilities
 * Assumes Armenian phone numbers with +374 country code
 */

const COUNTRY_CODE = '+374';

/**
 * Format a phone number for display
 * Input can be: 37412345678, 12345678, "37412345678", "+37412345678"
 * Output: +374 12 345 678
 */
export const formatPhoneDisplay = (phone: string | number | undefined | null): string => {
  if (!phone) return '';
  
  // Convert to string and remove all non-digits
  let digits = String(phone).replace(/\D/g, '');
  
  // Remove country code if present (374)
  if (digits.startsWith('374')) {
    digits = digits.slice(3);
  }
  
  // If we have 8 digits, format as XX XXX XXX
  if (digits.length === 8) {
    return `${COUNTRY_CODE} ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }
  
  // For other lengths, just add country code and return
  if (digits.length > 0) {
    return `${COUNTRY_CODE} ${digits}`;
  }
  
  return '';
};

/**
 * Format phone for API submission (just digits with country code)
 * Input: "12 345 678" or "12345678"
 * Output: "37412345678"
 */
export const formatPhoneForApi = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  
  // If already has country code, return as is
  if (digits.startsWith('374') && digits.length === 11) {
    return digits;
  }
  
  // Add country code
  return `374${digits}`;
};

/**
 * Extract just the local number (without country code)
 * Input: "37412345678" or "+374 12 345 678"
 * Output: "12345678"
 */
export const getLocalNumber = (phone: string | number | undefined | null): string => {
  if (!phone) return '';
  
  let digits = String(phone).replace(/\D/g, '');
  
  // Remove country code if present
  if (digits.startsWith('374')) {
    digits = digits.slice(3);
  }
  
  return digits;
};

/**
 * Validate Armenian phone number (8 digits starting with 1-9)
 */
export const isValidArmenianPhone = (phone: string): boolean => {
  const digits = getLocalNumber(phone);
  return /^[1-9]\d{7}$/.test(digits);
};
