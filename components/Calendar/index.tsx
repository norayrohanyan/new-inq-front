import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import * as Styled from './styled';

interface ICalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  intervals?: Record<string, {
    date: string;
    total_price: number;
    price: number;
    available: boolean;
    discounted: boolean;
  }>;
  currency?: string;
  minDate?: Date;
  maxDate?: Date;
  onMonthChange?: (startDate: string) => void;
  isLoading?: boolean;
}

const Calendar: React.FC<ICalendarProps> = ({
  selectedDate,
  onSelectDate,
  intervals = {},
  minDate,
  maxDate,
  onMonthChange,
  isLoading = false,
}) => {
  const t = useTranslations();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Helper function to format date to API format
  const formatDateToAPI = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to get interval data for a date
  const getIntervalData = (dateString: string, intervals: Record<string, any>) => {
    const interval = intervals[dateString];
    if (interval) {
      return {
        price: interval.total_price || interval.price,
        isDiscounted: interval.discounted || false,
      };
    }
    return {
      isDiscounted: false,
    };
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay();
    // Convert Sunday (0) to 7 for Monday-first week
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;
    
    const days: Array<{
      date: Date;
      dateString: string;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isDisabled: boolean;
      price?: number;
      isDiscounted: boolean;
    }> = [];

    // Add previous month's days
    for (let i = firstDayOfWeek - 1; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      const dateString = formatDateToAPI(date);
      days.push({
        date,
        dateString,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true,
        price: getIntervalData(dateString, intervals).price,
        isDiscounted: getIntervalData(dateString, intervals).isDiscounted,
      });
    }

    // Add current month's days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateString = formatDateToAPI(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const hasIntervals = Object.keys(intervals).length > 0;
      const isDisabled =
        (hasIntervals && !intervals[dateString]?.available) ||
        (minDate && date < minDate) ||
        (maxDate && date > maxDate);

      const intervalData = getIntervalData(dateString, intervals);
      days.push({
        date,
        dateString,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: dateString === selectedDate,
        isDisabled: isDisabled || false,
        price: intervalData.price,
        isDiscounted: intervalData.isDiscounted,
      });
    }

    // Add next month's days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      const dateString = formatDateToAPI(date);
      days.push({
        date,
        dateString,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true,
        price: getIntervalData(dateString, intervals).price,
        isDiscounted: getIntervalData(dateString, intervals).isDiscounted,
      });
    }

    return days;
  }, [currentMonth, intervals, selectedDate, minDate, maxDate]);

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
    
    // Notify parent about month change
    if (onMonthChange) {
      const startDate = `${newMonth.getFullYear()}-${String(newMonth.getMonth() + 1).padStart(2, '0')}-01`;
      onMonthChange(startDate);
    }
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    
    // Notify parent about month change
    if (onMonthChange) {
      const startDate = `${newMonth.getFullYear()}-${String(newMonth.getMonth() + 1).padStart(2, '0')}-01`;
      onMonthChange(startDate);
    }
  };

  const handleDateClick = (day: typeof calendarDays[0]) => {
    if (!day.isDisabled) {
      onSelectDate(day.dateString);
    }
  };

  const monthYearText = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  return (
    <Styled.CalendarContainer>
      {/* Header */}
      <Styled.CalendarHeader>
        <Text type="h5" color="white" fontWeight="600">
          {monthYearText} {isLoading && '...'}
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Styled.MonthNavButton type="button" onClick={handlePrevMonth} disabled={isLoading}>
            ‹
          </Styled.MonthNavButton>
          <Styled.MonthNavButton type="button" onClick={handleNextMonth} disabled={isLoading}>
            ›
          </Styled.MonthNavButton>
        </div>
      </Styled.CalendarHeader>

      {/* Days of week */}
      <Styled.DaysOfWeekRow>
        {daysOfWeek.map((day) => (
          <Styled.DayOfWeekCell key={day}>
            <Text type="caption" color="secondarySemiLight">
              {day}
            </Text>
          </Styled.DayOfWeekCell>
        ))}
      </Styled.DaysOfWeekRow>

      {/* Calendar grid */}
      <Styled.CalendarGrid>
        {calendarDays.map((day, index) => (
          <Styled.DayCell
            key={`${day.dateString}-${index}`}
            $isCurrentMonth={day.isCurrentMonth}
            $isToday={day.isToday}
            $isSelected={day.isSelected}
            $isDisabled={day.isDisabled}
            onClick={() => handleDateClick(day)}
          >
            <Styled.DayNumber $isToday={day.isToday}>
              {day.date.getDate()}
            </Styled.DayNumber>
            {day.price !== undefined && day.isCurrentMonth && !day.isDisabled && (
              <Styled.DayPrice $isDiscounted={day.isDiscounted}>
                {formatPrice(day.price)}
              </Styled.DayPrice>
            )}
          </Styled.DayCell>
        ))}
      </Styled.CalendarGrid>
    </Styled.CalendarContainer>
  );
};

export default Calendar;

