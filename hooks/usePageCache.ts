import { useRef, useCallback } from 'react';

interface PageCacheEntry<T> {
  data: T[];
  totalPages: number;
}

export function usePageCache<T = any>(cacheKey: string) {
  const cacheRef = useRef<Map<number, PageCacheEntry<T>>>(new Map());
  const lastKeyRef = useRef(cacheKey);

  if (lastKeyRef.current !== cacheKey) {
    cacheRef.current.clear();
    lastKeyRef.current = cacheKey;
  }

  const get = useCallback((page: number): PageCacheEntry<T> | null => {
    return cacheRef.current.get(page) ?? null;
  }, []);

  const set = useCallback((page: number, data: T[], totalPages: number) => {
    cacheRef.current.set(page, { data, totalPages });
  }, []);

  const clear = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  return { get, set, clear };
}
