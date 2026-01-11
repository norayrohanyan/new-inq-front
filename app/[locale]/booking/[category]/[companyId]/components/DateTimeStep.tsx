'use client';

import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import Calendar from '@/components/Calendar';
import * as Styled from '../styled';
import { useBookingContext } from './BookingContext';

export const DateTimeStep = () => {
  const t = useTranslations();
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    beautyTimeSlots,
    isLoadingTimeSlots,
    availableIntervals,
  } = useBookingContext();

  return (
    <>
      <Text type="h2" color="white" fontWeight="700" align="center">
        {t('booking.chooseDateTime')}
      </Text>
      <Styled.DateTimeContainer>
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          minDate={new Date()}
          intervals={availableIntervals}
        />

        {/* Time Slots */}
        {selectedDate && isLoadingTimeSlots && (
          <div style={{ 
            width: '100%', 
            padding: '3rem 2rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Text type="body" color="white" align="center">
              {t('common.loading')}
            </Text>
          </div>
        )}
        
        {selectedDate && !isLoadingTimeSlots && beautyTimeSlots.length > 0 && (
          <Styled.TimeSlotsSection>
            <Text type="h4" color="white" fontWeight="700" style={{ marginBottom: '1rem' }}>
              {t('booking.availableTimes')}
            </Text>
            <Styled.TimeSlotGrid>
              {beautyTimeSlots.map((slot) => (
                <Styled.TimeSlotButton
                  key={slot.start}
                  $selected={selectedTime === slot.start}
                  onClick={() => setSelectedTime(slot.start)}
                >
                  <Text type="body" color="white" fontWeight="500">
                    {slot.start}
                  </Text>
                </Styled.TimeSlotButton>
              ))}
            </Styled.TimeSlotGrid>
          </Styled.TimeSlotsSection>
        )}
        
        {selectedDate && !isLoadingTimeSlots && beautyTimeSlots.length === 0 && (
          <div style={{ 
            width: '100%', 
            padding: '3rem 2rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'rgba(255, 255, 255, 0.03)', 
            borderRadius: '16px', 
            marginTop: '2rem' 
          }}>
            <Text type="body" color="secondarySemiLight" align="center">
              {t('booking.noAvailableTimes')}
            </Text>
          </div>
        )}
      </Styled.DateTimeContainer>
    </>
  );
};

