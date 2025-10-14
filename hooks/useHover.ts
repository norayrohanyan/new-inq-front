import { useEffect, useState } from 'react';

/**
 * Hook to detect hover state on one or multiple elements
 * @param elements - Array of HTML/SVG elements to track hover state
 * @returns boolean - true if any element is being hovered
 */
export const useHover = (
  elements: Array<HTMLElement | SVGElement | null> | null
): boolean => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!elements?.length) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = (event: Event) => {
      // Check if we're moving to another ref in the array
      const mouseEvent = event as MouseEvent;
      const toElement = mouseEvent.relatedTarget as HTMLElement;
      if (toElement && elements.some((element) => element?.contains(toElement))) {
        return; // Still hovering over one of the refs
      }

      setIsHovered(false);
    };

    const cleanupFunctions: (() => void)[] = [];

    elements.forEach((element) => {
      if (!element) return;

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      cleanupFunctions.push(() => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [elements]);

  return isHovered;
};

