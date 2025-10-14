import { useEffect, useCallback, useState } from 'react';

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
  const isClient = typeof window === 'object';

  const getWidth = useCallback(
    (): number => (isClient ? window.innerWidth : 0),
    [isClient]
  );

  const checkRangeMatch = useCallback((): boolean => {
    const width = getWidth();
    return width >= min && width <= max;
  }, [getWidth, min, max]);

  const [isMatching, setMatchingState] = useState<boolean>(checkRangeMatch());

  const handleResize = useCallback((): void => {
    setMatchingState(checkRangeMatch());
  }, [checkRangeMatch, setMatchingState]);

  useEffect(() => {
    setMatchingState(checkRangeMatch());
  }, [size, checkRangeMatch]);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, handleResize]);

  return isMatching;
};
