'use client';

import { useTranslations } from 'next-intl';
import ImageGallery from '@/components/ImageGallery';
import ReservationForm from '@/components/ReservationForm';
import Text from '@/components/Text';
import { ShareIcon, StarIcon, LocationIcon, HomeIcon, BedIcon } from '@/components/icons';
import { FavoriteButton } from '@/components/FavoriteButton';
import * as Styled from './styled';

export interface RentalDetailData {
  id: number;
  name: string;
  description: string;
  rating: string | number;
  price: number;
  currency: string;
  imageUrls: string[];
  intervals?: Record<string, any>;
  address?: string;
  latitude?: number;
  longitude?: number;
  companyId?: number;
  companyName?: string;
  
  // Specifications (flexible for different rental types)
  specifications?: Array<{
    icon?: React.ReactNode;
    label: string;
    value: string | number | boolean;
  }>;
  
  // Type-specific data
  checkIn?: string;
  checkOut?: string;
  totalSquare?: number;
  roomCount?: number;
  isApartment?: boolean;
}

interface RentalDetailTemplateProps {
  data: RentalDetailData;
  category: string;
  type: 'car' | 'apartment';
  onShare?: () => void;
}

export default function RentalDetailTemplate({
  data,
  category,
  type,
  onShare,
}: RentalDetailTemplateProps) {
  const t = useTranslations();

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else if (navigator.share) {
      navigator.share({
        title: data.name,
        text: data.description,
        url: window.location.href,
      });
    }
  };

  const showMap = type === 'apartment' && data.latitude && data.longitude;

  return (
    <Styled.PageContainer>
      {/* Header Section */}
      <Styled.HeaderSection>
        <Styled.TitleSection>
          <Text type="h2" color="white" fontWeight="700">
            {data.name}
          </Text>
          <Styled.RatingRow>
            <StarIcon width={20} height={20} />
            <Text type="h6" color="white" fontWeight="600">
              {data.rating}
            </Text>
          </Styled.RatingRow>
        </Styled.TitleSection>
        
        <Styled.ActionButtons>
          <Styled.ActionButton onClick={handleShare}>
            <ShareIcon width={14} height={14} />
          </Styled.ActionButton>
          <FavoriteButton
            companyId={data.companyId || data.id}
            category={category}
            size="medium"
          />
        </Styled.ActionButtons>
      </Styled.HeaderSection>

      {/* Main Content */}
      <Styled.ContentSection>
        {/* Left Side - Gallery */}
        <Styled.LeftSection>
            <ImageGallery images={data.imageUrls} alt={data.name} />
             {/* About & Specifications Section */}
            <Styled.AboutSection>
                <Text type="h3" color="white" fontWeight="700">
                {type === 'apartment' ? t('company.aboutApartment') : t('company.aboutCar')}
                </Text>
                
                <Text type="body" color="white">
                {data.description}
                </Text>

                {/* Price Display */}
                <Styled.PriceRow>
                <Text type="h2" customColor="#FF8A65" fontWeight="700">
                    {data.currency} {data.price.toLocaleString()}
                </Text>
                <Text type="body" color="secondarySemiLight">
                    {t('company.perDay')}
                </Text>
                </Styled.PriceRow>

                {/* Specifications List */}
                {data.specifications && data.specifications.length > 0 && (
                <Styled.SpecificationsList>
                    {data.specifications.map((spec, index) => (
                    <Styled.SpecificationItem key={index}>
                        {spec.label ? (
                        <>
                            <Styled.SpecificationLeft>
                            {spec.icon && spec.icon}
                            <Text type="body" color="white" fontWeight="400">
                                {spec.label}
                            </Text>
                            </Styled.SpecificationLeft>
                            <Text type="body" color="white" fontWeight="400">
                            {typeof spec.value === 'boolean' 
                                ? (spec.value ? t('common.yes') : t('common.no'))
                                : spec.value}
                            </Text>
                        </>
                        ) : (
                        <Styled.SpecificationLeft>
                            {spec.icon && spec.icon}
                            <Text type="body" color="white" fontWeight="600">
                            {typeof spec.value === 'boolean' 
                                ? (spec.value ? t('common.yes') : t('common.no'))
                                : spec.value}
                            </Text>
                        </Styled.SpecificationLeft>
                        )}
                    </Styled.SpecificationItem>
                    ))}
                </Styled.SpecificationsList>
                )}
            </Styled.AboutSection>
        </Styled.LeftSection>

        {/* Right Side - Reservation Form */}
        <Styled.RightSection>
          <ReservationForm
            type={type}
            itemId={data.id}
            price={data.price}
            currency={data.currency}
            companyName={data.companyName}
            intervals={data.intervals}
          />

          {/* Map (if applicable) */}
          {showMap && (
            <Styled.MapContainer>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://www.google.com/maps?q=${data.latitude},${data.longitude}&hl=en&z=14&output=embed`}
                title={`${data.name} location`}
              />
            </Styled.MapContainer>
          )}
        </Styled.RightSection>
      </Styled.ContentSection>

   
    </Styled.PageContainer>
  );
}

