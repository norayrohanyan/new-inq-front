import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import Text from '@/components/Text';
import { StarIcon } from '@/components/icons';
import { ICompany } from '@/types/user';
import { isServiceCategory } from '@/consts/categoryTemplates';
import * as Styled from '../styled';
import { useIsMobile } from '@/hooks/useIsMobile';

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
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const isMobile = useIsMobile();

  const handleCompanyClick = () => {
    if (company?.id && company?.category) {
      if (isServiceCategory(company.category)) {
        router.push(`/${locale}/detail/${company.category}/${company.id}`);
      } else {
        router.push(`/${locale}/categories/${company.category}/company/${company.id}`);
      }
    }
  };

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
        <Styled.TitleRow onClick={handleCompanyClick}>
          <Text type={isMobile ? 'h6' : 'h3'} color="white" fontWeight="600">
            {title}
          </Text>
        </Styled.TitleRow>
        <Styled.RatingBadge>
          <StarIcon width={isMobile ? 12 : 16} height={isMobile ? 12 : 16} />
          <Text type={isMobile ? 'caption' : 'body'} color="white">
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
              <Text type={isMobile ? 'caption' : 'p'} color="white">
                {t('ticketDetail.company')}:
              </Text>
              <Text
                type={isMobile ? 'caption' : 'p'}
                customColor="#999999"
                onClick={handleCompanyClick}
                style={{ cursor: 'pointer' }}
              >
                {company.name}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type={isMobile ? 'caption' : 'p'} color="white">
                {t('ticketDetail.address')}:
              </Text>
              <Text type={isMobile ? 'caption' : 'p'} customColor="#999999">
                {company.address}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type={isMobile ? 'caption' : 'p'} color="white">
                {t('ticketDetail.phoneNumber')}:
              </Text>
              <Text type={isMobile ? 'caption' : 'p'} customColor="#999999">
                {company.phones?.[0]}
              </Text>
            </Styled.InfoRow>
          </Styled.CompanyInfo>
        )}
      </Styled.HeaderInfo>
    </Styled.CardHeader>
  );
};

