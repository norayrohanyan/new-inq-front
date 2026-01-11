'use client';

import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import * as Styled from '../styled';
import { useBookingContext } from './BookingContext';

export const ServiceStep = () => {
  const t = useTranslations();
  const { services, selectedServices, handleServiceToggle } = useBookingContext();

  return (
    <>
      <Text type="h2" color="white" fontWeight="700" align="center">
        {t('booking.chooseService')}
      </Text>
      <Styled.SelectionList>
        {services && services.map((service: any) => (
          <Styled.SelectionItem
            key={service.id}
            $selected={selectedServices.some(s => s.id === service.id)}
            onClick={() => handleServiceToggle(service)}
          >
            <Styled.Checkbox $checked={selectedServices.some(s => s.id === service.id)} />
            <Text type="body" color="white" fontWeight="400">
              {service.name}
            </Text>
          </Styled.SelectionItem>
        ))}
      </Styled.SelectionList>
    </>
  );
};

