import { useRef, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { useEventListener } from './useEventListener';

interface UseInfiniteScrollOptions {
  /** Whether infinite scroll is enabled */
  enabled?: boolean;
  /** Whether currently loading */
  isLoading: boolean;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Callback to load more items */
  onLoadMore: () => void;
  /** Distance from bottom (in px) to trigger load more */
  threshold?: number;
  /** Debounce delay in ms */
  debounceMs?: number;
}

interface UseInfiniteScrollReturn {
  /** Ref to attach to sentinel element at the bottom of the list */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook for infinite scroll functionality with debounced scroll detection
 * 
 * @example
 * ```tsx
 * const { sentinelRef } = useInfiniteScroll({
 *   isLoading,
 *   hasMore: currentPage < totalPages,
 *   onLoadMore: () => setCurrentPage(prev => prev + 1),
 * });
 * 
 * return (
 *   <>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     <div ref={sentinelRef} />
 *   </>
 * );
 * ```
 */
export const useInfiniteScroll = ({
  enabled = true,
  isLoading,
  hasMore,
  onLoadMore,
  threshold = 200,
  debounceMs = 150,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(isLoading);

  // Keep isLoadingRef in sync with isLoading prop
  isLoadingRef.current = isLoading;

  // Debounced scroll handler
  const handleScroll = useMemo(
    () =>
      debounce(() => {
        if (!enabled || !sentinelRef.current || isLoadingRef.current || !hasMore) {
          return;
        }

        const sentinel = sentinelRef.current;
        const rect = sentinel.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Load more when sentinel is within threshold of viewport bottom
        if (rect.top <= windowHeight + threshold) {
          onLoadMore();
        }
      }, debounceMs),
    [enabled, hasMore, onLoadMore, threshold, debounceMs]
  );

  // Use our reusable event listener hook
  useEventListener('scroll', handleScroll, enabled ? window : null, { passive: true });

  return { sentinelRef };
};
