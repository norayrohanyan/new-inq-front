'use client';

import { createContext, useContext } from 'react';
import { BookingContextType } from './types';

export const BookingContext = createContext<BookingContextType | null>(null);

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};

