import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { IApartmentBookingDetail } from '@/types/user';
import { BookingHeader } from './BookingHeader';
import { GuestInformation } from './GuestInformation';
import { DateTimeSection } from './DateTimeSection';
import { AreaIcon, BedroomIcon, LevelIcon } from './Icons';
import * as Styled from '../styled';

interface IApartmentBookingDetailProps {
  booking: IApartmentBookingDetail;
  getStatusText: (status: string) => string;
}

export const ApartmentBookingDetail = ({ 
  booking, 
  getStatusText 
}: IApartmentBookingDetailProps) => {
  const t = useTranslations();

  const title = booking.apartment?.is_apartment 
    ? t('ticketDetail.apartment') 
    : t('ticketDetail.house');

  return (
    <>
      <BookingHeader
        title={title}
        imageUrl={booking.apartment?.image_urls?.[0]}
        rating={booking.apartment?.rating || 0}
        status={booking.status}
        company={booking.company}
        getStatusText={getStatusText}
      />

      <GuestInformation guest={booking.guest} />

      <DateTimeSection
        startLabel={t('ticketDetail.checkIn')}
        endLabel={t('ticketDetail.checkOut')}
        startDateTime={booking.check_in}
        endDateTime={booking.check_out}
      />

      <Styled.ApartmentInfo>
        <Text type="h5" color="white" fontWeight="500">
          {t('ticketDetail.apartmentInformation')}
        </Text>
        <Styled.InfoRow style={{ marginTop: '12px' }}>
          <Text type="p" color="white">
            {t('ticketDetail.apartmentAddress')}:
          </Text>
          <Text type="p" customColor="#999999">
            {booking.apartment?.address}
          </Text>
        </Styled.InfoRow>
        <Styled.ApartmentDetails>
          <Styled.DetailItem>
            <AreaIcon />
            <Text type="body" color="white">
              {booking.apartment?.total_square} m²
            </Text>
          </Styled.DetailItem>
          <Styled.DetailItem>
            <BedroomIcon />
            <Text type="body" color="white">
              {booking.apartment?.room_count} {t('ticketDetail.bedrooms')}
            </Text>
          </Styled.DetailItem>
          <Styled.DetailItem>
            <LevelIcon />
            <Text type="body" color="white">
              {t('ticketDetail.level')} {booking.apartment?.level}
            </Text>
          </Styled.DetailItem>
        </Styled.ApartmentDetails>
      </Styled.ApartmentInfo>
    </>
  );
};

