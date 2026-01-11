import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { StarIcon } from '@/components/icons';
import { ICompany } from '@/types/user';
import * as Styled from '../styled';

interface IBookingHeaderProps {
  title: string;
  imageUrl?: string;
  rating: number;
  status: string;
  company?: ICompany;
  getStatusText: (status: string) => string;
}

export const BookingHeader = ({
  title,
  imageUrl,
  rating,
  status,
  company,
  getStatusText,
}: IBookingHeaderProps) => {
  const t = useTranslations();

  return (
    <Styled.CardHeader>
      <Styled.ImageContainer>
        {imageUrl ? (
          <Styled.Image src={imageUrl} alt={title} />
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
            {rating}
          </Text>
        </Styled.RatingBadge>
        <Styled.StatusBadge $status={status}>
          <Text type="caption" color="white" fontWeight="500">
            {getStatusText(status)}
          </Text>
        </Styled.StatusBadge>
        {company && (
          <Styled.CompanyInfo>
            <Styled.InfoRow>
              <Text type="p" color="white">
                {t('ticketDetail.company')}:
              </Text>
              <Text type="p" customColor="#999999">
                {company.name}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="p" color="white">
                {t('ticketDetail.address')}:
              </Text>
              <Text type="p" customColor="#999999">
                {company.address}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="p" color="white">
                {t('ticketDetail.phoneNumber')}:
              </Text>
              <Text type="p" customColor="#999999">
                {company.phones?.[0]}
              </Text>
            </Styled.InfoRow>
          </Styled.CompanyInfo>
        )}
      </Styled.HeaderInfo>
    </Styled.CardHeader>
  );
};

