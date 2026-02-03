import { useState, useEffect } from 'react';

interface IResponsiveSize {
  min?: number;
  max: number;
}

type TSize = number | IResponsiveSize;

/**
 * Hook to detect if window size matches a specific range
 * @param size - Max width number or object with min/max
 * @returns boolean - true if window width is in range
 */
export const useResponsive = (size: TSize): boolean => {
  const sizes = typeof size === 'object' ? size : { max: size };
  const { min = 0, max } = sizes;

  // Start with false to match desktop SSR (prevents hydration mismatch)
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    // Build media query string
    const minQuery = min > 0 ? `(min-width: ${min}px)` : '';
    const maxQuery = `(max-width: ${max}px)`;
    const query = min > 0 ? `${minQuery} and ${maxQuery}` : maxQuery;

    // Create MediaQueryList object
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setIsMatch(mediaQuery.matches);

    // Handler for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMatch(event.matches);
    };

    // Add listener (works with DevTools device toolbar)
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [min, max]);

  return isMatch;
};
