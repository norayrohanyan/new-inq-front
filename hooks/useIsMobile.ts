import { useResponsive } from './useResponsive';
import { MOBILE_SIZE_BREAKPOINT, TABLET_SIZE_BREAKPOINT } from '@/consts';

/**
 * Hook to detect if the current screen size is mobile
 * @returns boolean - true if window width <= MOBILE_SIZE_BREAKPOINT (768px)
 */
export const useIsMobile = (): boolean => {
  return useResponsive(MOBILE_SIZE_BREAKPOINT);
};

/**
 * Hook to detect if the current screen size is tablet or smaller
 * @returns boolean - true if window width <= TABLET_SIZE_BREAKPOINT (1024px)
 */
export const useIsTablet = (): boolean => {
  return useResponsive(TABLET_SIZE_BREAKPOINT);
};

/**
 * Hook to get comprehensive responsive state
 * @returns object with boolean flags for different screen sizes
 */
export const useDeviceType = () => {
  const isMobile = useResponsive(MOBILE_SIZE_BREAKPOINT);
  const isTablet = useResponsive(TABLET_SIZE_BREAKPOINT);

  return {
    isMobile,
    isTablet,
    isDesktop: !isTablet,
  };
};
