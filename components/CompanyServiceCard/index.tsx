import React from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Text from '@/components/Text';
import { FavoriteButton } from '@/components/FavoriteButton';
import * as Styled from './styled';
import { ICompany } from '@/store/types/companies';
import { IService } from '@/store/types/services';
import { ShareIcon, LocationIcon, ClockIcon, StarIcon } from '@/components/icons';
import { COLORS } from '@/consts/colors';
import { isRentalCategory } from '@/consts/categoryTemplates';

type CompanyService = ICompany | IService;

interface ICompanyServiceCardProps {
  data: CompanyService;
  category: string;
}

const CompanyServiceCard: React.FC<ICompanyServiceCardProps> = ({
  data,
  category,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const isCompany = 'work_hours' in data || 'is_open' in data;

  const imageUrl = isCompany
    ? (data as ICompany).image_url
    : (data as IService).image_urls?.[0];

  const handleCardClick = () => {
    const isRental = isRentalCategory(category);
    
    if (isCompany) {
      // For companies in rental categories, navigate to company inventory page
      if (isRental) {
        router.push(`/${locale}/categories/${category}/company/${data.id}`);
      } else {
        // Navigate to unified detail page (service company)
        router.push(`/${locale}/detail/${category}/${data.id}`);
      }
    } else {
      // Non-company items (services, apartments, cars)
      if (isRental) {
        // For apartments/cars, navigate to detail page
        router.push(`/${locale}/detail/${category}/${data.id}`);
      } else {
        // For services, navigate to booking page with company selection
        router.push(`/${locale}/booking/${category}/0?serviceId=${data.id}`);
      }
    }
  };

  return (
    <Styled.CardContainer onClick={handleCardClick}>
      <Styled.ImageWrapper>
        {imageUrl ? (
          <img src={imageUrl} alt={data.name} />
        ) : (
          <Text type="body" color="secondarySemiLight">
            No Image
          </Text>
        )}
      </Styled.ImageWrapper>
      <Styled.InfoWrapper>
        <Text type="small" color="white" fontWeight="600">
          {data.name}
        </Text>
        {isCompany ? (
          <>
            <Styled.StatusBadge $isOpen={(data as ICompany).is_open}>
              <Text type="caption" color="white" fontWeight="500">
                {(data as ICompany).is_open ? 'OPEN' : 'CLOSED'}
              </Text>
            </Styled.StatusBadge>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <LocationIcon width={12} height={12} fill={COLORS.secondarySemiLight} />
              <Text type="caption" color="secondarySemiLight">
                {(data as ICompany).address}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <StarIcon width={12} height={12} fill={COLORS.brandOrangeMid} />
              <Text type="caption" color="white">
                {(data as ICompany).rating}
              </Text>
            </div>
            {(data as ICompany).work_hours && Array.isArray((data as ICompany).work_hours) && (data as ICompany).work_hours.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ClockIcon width={12} height={12} fill={COLORS.secondarySemiLight} />
                <Text type="caption" color="secondarySemiLight">
                  {(data as ICompany).work_hours[0]}
                </Text>
              </div>
            )}
          </>
        ) : (
          <>
            <Text type="body" color="secondarySemiLight">
              {(data as IService).company_name}
            </Text>
            <Text type="body" color="secondarySemiLight">
              Price: ${(data as IService).price}
              {(data as IService).discount && (
                <Styled.DiscountText>
                  -{(data as IService).discount?.percentage}%
                </Styled.DiscountText>
              )}
            </Text>
          </>
        )}
      </Styled.InfoWrapper>
      <Styled.ActionButtons onClick={(e) => e.stopPropagation()}>
        <Styled.ActionButton onClick={(e) => {
          e.stopPropagation();
          // Handle share
        }}>
          <ShareIcon width={12} height={12} />
        </Styled.ActionButton>
        <FavoriteButton
          companyId={data.id}
          category={category}
          size="small"
        />
      </Styled.ActionButtons>
    </Styled.CardContainer>
  );
};

export default CompanyServiceCard;
