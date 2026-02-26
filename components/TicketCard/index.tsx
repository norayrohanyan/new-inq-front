import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Text from '@/components/Text';
import { ClockIcon } from '@/components/icons/clock';
import { PhoneIcon } from '@/components/icons/phone';
import * as Styled from './styled';
import { IBookingHistory } from '@/types/user';
import { AmdIcon } from '../icons/amd';
import DefaultCompanyIcon from '../icons/defaultCompany';

interface ITicketCardProps {
  booking: IBookingHistory;
  onMenuClick?: (bookingId: number) => void;
  onClick?: (bookingId: number, category: string) => void;
  source?: 'tickets' | 'history'; // Which tab this card is from
}

const TicketCard: React.FC<ITicketCardProps> = ({ booking, onMenuClick, onClick, source = 'tickets' }) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const handleCardClick = () => {
    if (onClick) {
      onClick(booking.booking_id, booking.category);
    } else {
      // Navigate to ticket detail page with source tab
      router.push(`/${locale}/profile/ticket/${booking.category}/${booking.booking_id}?tab=${source}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in_process':
        return 'primary'; // Orange
      case 'pending':
        return 'pending'; // Gray
      case 'canceled':
      case 'rejected':
        return 'canceled'; // Red
      case 'completed':
      case 'approved':
        return 'approved'; // Green
      default:
        return 'pending';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in_process':
        return t('booking.status.inProcess');
      case 'pending':
        return t('booking.status.pending');
      case 'canceled':
        return t('booking.status.canceled');
      case 'rejected':
        return t('booking.status.rejected');
      case 'completed':
        return t('booking.status.completed');
      case 'approved':
        return t('booking.status.approved');
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const categoryTranslationMap: Record<string, string> = {
    beauty_salon: 'joinUs.categories.beautySalon',
    apartment_rental: 'joinUs.categories.apartmentRental',
    car_rental: 'joinUs.categories.carRental',
    car_wash: 'joinUs.categories.carWash',
    animal_care: 'joinUs.categories.animalCare',
    medical: 'joinUs.categories.medical',
    photo_studio: 'joinUs.categories.photoStudio',
    game_zone: 'joinUs.categories.gameZone',
    car_maintenance: 'joinUs.categories.carMaintenance',
    coworking: 'joinUs.categories.coworking',
  };

  const getCategoryLabel = (category: string) => {
    const key = categoryTranslationMap[category];
    return key ? t(key) : category.replace('_', ' ');
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking menu
    onMenuClick?.(booking.booking_id);
  };

  return (
    <Styled.CardContainer onClick={handleCardClick} $clickable>
      <Styled.StatusSection>
        <Styled.StatusBadge $status={getStatusColor(booking.status)}>
          <Text type="caption" color="white" fontWeight="500">
            {getStatusText(booking.status)}
          </Text>
        </Styled.StatusBadge>
      </Styled.StatusSection>

      <Styled.ContentWrapper>
        <Styled.ImageContainer>
          {booking.company_logo ? (
            <Styled.Image src={booking.company_logo} alt={booking.company_name} />
          ) : (
            <Styled.PlaceholderImage>
              <DefaultCompanyIcon width={80} height={80}/>
          </Styled.PlaceholderImage>
          )}
        </Styled.ImageContainer>

        <Styled.InfoSection>
          <Text type="body" color="white" fontWeight="500">
            {booking.company_name}
          </Text>
          {booking.service_name && (
            <Text type="body" color="white" fontWeight="500">
              {booking.service_name}
            </Text>
          )}
          <Text type="caption" color="secondarySemiLight">
            {t('ticketDetail.category')}: {getCategoryLabel(booking.category)}
          </Text>

          <Styled.DetailsRow>
            <ClockIcon width="14" height="14" />
            <Text type="caption" color="white">
              {formatDate(booking.date)}, {formatTime(booking.date)}
            </Text>
          </Styled.DetailsRow>

          {booking.company_phone && (
            <Styled.DetailsRow>
              <PhoneIcon width="14" height="14" />
              <Text type="caption" color="white">
                {booking.company_phone}
              </Text>
            </Styled.DetailsRow>
          )}
        </Styled.InfoSection>

        <Styled.PriceSection>
          <AmdIcon />
          <Text type="h5" color="white">
            {booking.total_price}
          </Text>
        </Styled.PriceSection>
      </Styled.ContentWrapper>
    </Styled.CardContainer>
  );
};

export default TicketCard;

