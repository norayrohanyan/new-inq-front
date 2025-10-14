import { useState, useEffect, RefObject } from 'react';

/**
 * Hook to detect if an element is in the viewport using IntersectionObserver
 * @param elementRef - Ref to the element to observe
 * @param threshold - Threshold for intersection (0 to 1), default 0
 * @returns boolean - true if element is in viewport
 */
export const useIsInViewport = (
  elementRef: RefObject<HTMLElement | null>,
  threshold: number = 0
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold]);

  return isIntersecting;
};

