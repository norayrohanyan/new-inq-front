import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { StarIcon } from '@/components/icons';
import { IBeautyBookingDetail } from '@/types/user';
import { BookingHeader } from './BookingHeader';
import { GuestInformation } from './GuestInformation';
import { formatDate } from './DateTimeSection';
import * as Styled from '../styled';

interface IServiceBookingDetailProps {
  booking: IBeautyBookingDetail;
  getStatusText: (status: string) => string;
  categoryTitle?: string;
}

export const ServiceBookingDetail = ({ 
  booking, 
  getStatusText,
  categoryTitle,
}: IServiceBookingDetailProps) => {
  const t = useTranslations();

  const title = categoryTitle || t('ticketDetail.beautySalon');

  return (
    <>
      <Styled.CardHeader>
        <Styled.ImageContainer>
          {booking.company?.logo ? (
            <Styled.Image src={booking.company.logo} alt={booking.company.name} />
          ) : (
            <Styled.PlaceholderImage />
          )}
        </Styled.ImageContainer>
        <Styled.HeaderInfo>
          <Styled.TitleRow>
            <Text type="h3" color="white" fontWeight="600">
              {title}
            </Text>
          </Styled.TitleRow>
          <Styled.RatingBadge>
            <StarIcon width="16" height="16" />
            <Text type="body" color="white">
              {booking.company?.rating || 0}
            </Text>
          </Styled.RatingBadge>
          <Styled.StatusBadge $status={booking.status}>
            <Text type="caption" color="white" fontWeight="500">
              {getStatusText(booking.status)}
            </Text>
          </Styled.StatusBadge>
          <Styled.CompanyInfo>
            <Styled.InfoRow>
              <Text type="p" color="white">
                {t('ticketDetail.company')}:
              </Text>
              <Text type="p" customColor="#999999">
                {booking.company?.name}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="p" color="white">
                {t('ticketDetail.address')}:
              </Text>
              <Text type="p" customColor="#999999">
                {booking.company?.address}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="p" color="white">
                {t('ticketDetail.phoneNumber')}:
              </Text>
              <Text type="p" customColor="#999999">
                {booking.company?.phones?.[0]}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="p" color="white">
                {t('ticketDetail.date')}:
              </Text>
              <Text type="p" customColor="#999999">
                {formatDate(booking.date)}
              </Text>
            </Styled.InfoRow>
          </Styled.CompanyInfo>
        </Styled.HeaderInfo>
      </Styled.CardHeader>

      <GuestInformation guest={booking.guest} />

      {booking.services && booking.services.length > 0 && (
        <Styled.ServicesList>
          <Text type="h4" color="white" fontWeight="600">
            {t('ticketDetail.services')}
          </Text>
          {booking.services.map((service) => (
            <Styled.ServiceItem key={service.id}>
              <Text type="body" color="white">
                {service.name}:
              </Text>
              <Text type="body" customColor="#FE7F3B">
                {booking.currency} {service.price?.toLocaleString()}
              </Text>
            </Styled.ServiceItem>
          ))}
        </Styled.ServicesList>
      )}

      {booking.employee && (
        <Styled.EmployeeSection>
          <Text type="h4" color="white" fontWeight="600">
            {t('ticketDetail.employee')}
          </Text>
          <Styled.EmployeeCard>
            <Styled.EmployeeImage>
              {booking.employee.image_url && (
                <img src={booking.employee.image_url} alt={booking.employee.name} />
              )}
            </Styled.EmployeeImage>
            <Styled.EmployeeInfo>
              <Text type="body" color="white" fontWeight="500">
                {booking.employee.name}
              </Text>
            </Styled.EmployeeInfo>
            <Styled.RatingBadge>
              <StarIcon width="16" height="16" />
              <Text type="body" color="white">
                {booking.employee.rating}
              </Text>
            </Styled.RatingBadge>
          </Styled.EmployeeCard>
        </Styled.EmployeeSection>
      )}
    </>
  );
};

