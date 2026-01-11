import { useTranslations } from 'next-intl';
import { ICarBookingDetail } from '@/types/user';
import { BookingHeader } from './BookingHeader';
import { GuestInformation } from './GuestInformation';
import { DateTimeSection } from './DateTimeSection';

interface ICarBookingDetailProps {
  booking: ICarBookingDetail;
  getStatusText: (status: string) => string;
}

export const CarBookingDetail = ({ booking, getStatusText }: ICarBookingDetailProps) => {
  const t = useTranslations();

  return (
    <>
      <BookingHeader
        title={booking.car?.name || 'Car'}
        imageUrl={booking.car?.image_urls?.[0]}
        rating={booking.car?.rating || 0}
        status={booking.status}
        company={booking.company}
        getStatusText={getStatusText}
      />

      <GuestInformation guest={booking.guest} />

      <DateTimeSection
        startLabel={t('ticketDetail.pickUp')}
        endLabel={t('ticketDetail.return')}
        startDateTime={booking.pickup_time}
        endDateTime={booking.return_time}
      />
    </>
  );
};

