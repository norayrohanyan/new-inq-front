'use client';

import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import Input from '@/components/Input';
import { getLocalNumber } from '@/utils/phone';
import * as Styled from '../styled';
import { useBookingContext } from './BookingContext';

export const BookingInfoStep = () => {
  const t = useTranslations();
  const {
    selectedDate,
    selectedTime,
    companyDetails,
    selectedServices,
    selectedEmployee,
    totalDuration,
    totalPrice,
    bookingForOther,
    setBookingForOther,
    guestName,
    setGuestName,
    guestPhone,
    setGuestPhone,
    comments,
    setComments,
  } = useBookingContext();

  const handleGuestPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = getLocalNumber(e.target.value).slice(0, 8);
    setGuestPhone(digits);
  };

  return (
      <Styled.BookingInfoContainer>
        <Styled.InfoCard>
          <Text type="h4" color="white" fontWeight="700">
            {t('booking.bookingInfo')}
          </Text>
          
          <Styled.InfoRow>
            <Text type="body" color="secondarySemiLight">
              {t('booking.date')}:
            </Text>
            <Text type="body" color="white" fontWeight="600">
              {selectedDate && new Date(selectedDate).toLocaleDateString()} {selectedTime}
            </Text>
          </Styled.InfoRow>

          {companyDetails && (
            <Styled.InfoRow>
              <Text type="body" color="secondarySemiLight">
                {t('booking.company')}:
              </Text>
              <Text type="body" color="white" fontWeight="600">
                {companyDetails.name}
              </Text>
            </Styled.InfoRow>
          )}

          {selectedServices.length > 0 && (
            <Styled.InfoRow>
              <Text type="body" color="secondarySemiLight">
                {selectedServices.length === 1 ? t('booking.service') : t('booking.services')}:
              </Text>
              <Text type="body" color="white" fontWeight="600">
                {selectedServices.map(s => s.name).join(', ')}
              </Text>
            </Styled.InfoRow>
          )}

          {selectedEmployee && (
            <Styled.InfoRow>
              <Text type="body" color="secondarySemiLight">
                {t('booking.employee')}:
              </Text>
              <Text type="body" color="white" fontWeight="600">
                {selectedEmployee.name}
              </Text>
            </Styled.InfoRow>
          )}

          {totalDuration > 0 && (
            <Styled.InfoRow>
              <Text type="body" color="secondarySemiLight">
                {t('booking.duration')}:
              </Text>
              <Text type="body" color="white" fontWeight="600">
                {totalDuration} {t('booking.minutes')}
              </Text>
            </Styled.InfoRow>
          )}

          <Styled.InfoRow>
            <Text type="body" color="secondarySemiLight">
              {t('booking.price')}:
            </Text>
            <Text type="body" color="brandOrangeMid" fontWeight="700">
              {totalPrice.toLocaleString()} {t('booking.dram')}
            </Text>
          </Styled.InfoRow>
        </Styled.InfoCard>

        <Styled.FormContainer>
          <Styled.CheckboxRow onClick={() => setBookingForOther(!bookingForOther)}>
            <Styled.Checkbox $checked={bookingForOther} />
            <Text type="body" color="white">
              {t('company.bookingForSomeoneElse')}
            </Text>
          </Styled.CheckboxRow>

          <Styled.GuestSection $expanded={bookingForOther}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                type="text"
                placeholder={t('company.guestName')}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
              <Input
                type="tel"
                prefix="+374"
                placeholder="XX XXX XXX"
                value={guestPhone}
                onChange={handleGuestPhoneChange}
                inputMode="numeric"
              />
              <Styled.TextArea
                placeholder={t('company.comments')}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
              />
            </div>
          </Styled.GuestSection>

        </Styled.FormContainer>
      </Styled.BookingInfoContainer>
  );
};

