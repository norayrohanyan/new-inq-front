import React from 'react';
import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { ClockIcon } from '@/components/icons/clock';
import { PhoneIcon } from '@/components/icons/phone';
import * as Styled from './styled';
import { IBookingHistory } from '@/types/user';

interface ITicketCardProps {
  booking: IBookingHistory;
  onMenuClick?: (bookingId: number) => void;
}

const TicketCard: React.FC<ITicketCardProps> = ({ booking, onMenuClick }) => {
  const t = useTranslations();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'in_process':
        return 'primary'; // Orange
      case 'pending':
        return 'pending'; // Gray
      case 'cancelled':
        return 'cancelled'; // Red
      case 'completed':
      case 'approved':
        return 'approved'; // Green
      default:
        return 'pending';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'in_process':
        return t('booking.status.inProcess');
      case 'pending':
        return t('booking.status.pending');
      case 'cancelled':
        return t('booking.status.cancelled');
      case 'completed':
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

  return (
    <Styled.CardContainer>
      <Styled.StatusSection>
        <Styled.StatusBadge $status={getStatusColor(booking.status)}>
          <Text type="caption" color="white" fontWeight="500">
            {getStatusText(booking.status)}
          </Text>
        </Styled.StatusBadge>
        <Styled.MenuButton onClick={() => onMenuClick?.(booking.booking_id)}>
          <Styled.MenuDots>⋮</Styled.MenuDots>
        </Styled.MenuButton>
      </Styled.StatusSection>

      <Styled.ContentWrapper>
        <Styled.ImageContainer>
          {booking.company_logo ? (
            <Styled.Image src={booking.company_logo} alt={booking.company_name} />
          ) : (
            <Styled.PlaceholderImage />
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
            Category: {booking.category.replace('_', ' ')}
          </Text>

          <Styled.DetailsRow>
            <ClockIcon />
            <Text type="caption" color="white">
              {formatDate(booking.date)}, {formatTime(booking.date)}
            </Text>
          </Styled.DetailsRow>

          {booking.company_phone && (
            <Styled.DetailsRow>
              <PhoneIcon />
              <Text type="caption" color="white">
                {booking.company_phone}
              </Text>
            </Styled.DetailsRow>
          )}
        </Styled.InfoSection>

        <Styled.PriceSection>
          <Styled.PriceIcon>₯</Styled.PriceIcon>
          <Text type="h4" color="white" fontWeight="600">
            {booking.total_price}
          </Text>
        </Styled.PriceSection>
      </Styled.ContentWrapper>
    </Styled.CardContainer>
  );
};

export default TicketCard;

