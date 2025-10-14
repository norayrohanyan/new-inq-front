import { useEffect, useRef } from 'react';

/**
 * Hook to add event listener to an element
 * @param eventName - Name of the event (e.g., 'click', 'resize')
 * @param handler - Event handler function
 * @param element - Element to attach listener to (defaults to window)
 * @param options - Event listener options
 */
export function useEventListener<T extends Event = Event>(
  eventName: string,
  handler: (e: T) => void,
  element?: EventTarget | null,
  options?: boolean | AddEventListenerOptions
): void {
  const savedHandler = useRef<(e: T) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element ?? (typeof window !== 'undefined' ? window : null);
    
    if (!targetElement || !targetElement.addEventListener) {
      return;
    }

    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event as T);
      }
    };

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}

