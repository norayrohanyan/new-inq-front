'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  getApartmentIntervalsThunk,
  getCarIntervalsThunk,
  companyDetailsSelectors,
} from '@/store';

interface UseCalendarIntervalsProps {
  category: 'apartment_rental' | 'car_rental';
  itemId: number; // apartment ID or car ID
  autoLoad?: boolean; // automatically load initial intervals
}

interface UseCalendarIntervalsReturn {
  intervals: Record<string, any>;
  isLoading: boolean;
  loadIntervals: (startDate: string, append?: boolean) => Promise<void>;
  loadMoreIntervals: (direction: 'next' | 'prev') => Promise<void>;
  currentStartDate: string;
  hasMoreNext: boolean;
  hasMorePrev: boolean;
}

// Helper to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// Helper to add months to a date
const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const useCalendarIntervals = ({
  category,
  itemId,
  autoLoad = true,
}: UseCalendarIntervalsProps): UseCalendarIntervalsReturn => {
  const dispatch = useAppDispatch();
  
  const intervals = useAppSelector(companyDetailsSelectors.intervals) || {};
  const isLoading = useAppSelector(companyDetailsSelectors.isLoadingTimeSlots);
  
  const [currentStartDate, setCurrentStartDate] = useState<string>(() => formatDate(new Date()));
  const [loadedRanges, setLoadedRanges] = useState<{ start: string; end: string }[]>([]);
  const initialLoadDone = useRef(false);

  // Load intervals for a specific start date
  const loadIntervals = useCallback(async (startDate: string, append: boolean = false) => {
    if (!itemId) return;

    try {
      if (category === 'apartment_rental') {
        await dispatch(getApartmentIntervalsThunk({ 
          id: itemId, 
          startDate, 
          append 
        })).unwrap();
      } else if (category === 'car_rental') {
        await dispatch(getCarIntervalsThunk({ 
          id: itemId, 
          startDate, 
          append 
        })).unwrap();
      }

      // Track the loaded range (2 months from start date)
      const startDateObj = new Date(startDate);
      const endDateObj = addMonths(startDateObj, 2);
      
      setLoadedRanges(prev => {
        // Merge overlapping ranges
        const newRange = { start: startDate, end: formatDate(endDateObj) };
        if (append) {
          return [...prev, newRange];
        }
        return [newRange];
      });

      if (!append) {
        setCurrentStartDate(startDate);
      }
    } catch (error) {
      console.error('Failed to load intervals:', error);
    }
  }, [category, itemId, dispatch]);

  // Load more intervals in a direction
  const loadMoreIntervals = useCallback(async (direction: 'next' | 'prev') => {
    if (!loadedRanges.length) return;

    let newStartDate: Date;
    
    if (direction === 'next') {
      // Get the last loaded range's end date
      const lastRange = loadedRanges[loadedRanges.length - 1];
      newStartDate = new Date(lastRange.end);
    } else {
      // Get the first loaded range's start date and go back 2 months
      const firstRange = loadedRanges[0];
      newStartDate = addMonths(new Date(firstRange.start), -2);
    }

    await loadIntervals(formatDate(newStartDate), true);
  }, [loadedRanges, loadIntervals]);

  // Check if we have more data to load
  const hasMoreNext = true; // Always allow loading more future dates
  const hasMorePrev = loadedRanges.length > 0 && 
    new Date(loadedRanges[0].start) > new Date(); // Can load past dates up to today

  // Auto-load initial intervals
  useEffect(() => {
    if (autoLoad && itemId && !initialLoadDone.current) {
      initialLoadDone.current = true;
      loadIntervals(formatDate(new Date()));
    }
  }, [autoLoad, itemId, loadIntervals]);

  // Reset when item changes
  useEffect(() => {
    initialLoadDone.current = false;
    setLoadedRanges([]);
  }, [itemId]);

  return {
    intervals,
    isLoading,
    loadIntervals,
    loadMoreIntervals,
    currentStartDate,
    hasMoreNext,
    hasMorePrev,
  };
};

