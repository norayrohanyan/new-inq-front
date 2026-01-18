'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { StarIcon, LocationIcon } from '@/components/icons';
import { ShareButton } from '@/components/ShareButton';
import * as Styled from './styled';
import { getDetailUrl } from '@/utils/url';

interface RentalItemCardProps {
  id: number;
  name: string;
  rating: string;
  address: string;
  totalSquare?: number; // For apartments
  bedrooms?: number; // For apartments
  price: number;
  totalPrice: number; // Price after discount
  currency: string;
  imageUrls: string[];
  category: string;
}

const RentalItemCard: React.FC<RentalItemCardProps> = ({
  id,
  name,
  rating,
  address,
  totalSquare,
  bedrooms,
  price,
  totalPrice,
  currency,
  imageUrls,
  category,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasDiscount = price !== totalPrice;
  const isApartment = category === 'apartment_rental';

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const handleMoreInfo = () => {
    router.push(`/${locale}/detail/${category}/${id}`);
  };

  // Build the share URL for this rental item
  const shareUrl = getDetailUrl(locale, category, id);

  return (
    <Styled.Card>
      {/* Image Section - Simple, no carousel */}
      <Styled.ImageSection>
        <Styled.ImageWrapper>
          <Styled.Image src={imageUrls[0] || '/placeholder.png'} alt={name} />
        </Styled.ImageWrapper>
      </Styled.ImageSection>

      {/* Info Section */}
      <Styled.InfoSection>
        <Text type="h6" color="white" fontWeight="600">
          {name}
        </Text>

        <Styled.InfoRow>
          <StarIcon width={16} height={16} />
          <Text type="body" color="white">
            {rating}
          </Text>
        </Styled.InfoRow>

        <Styled.InfoRow>
          <LocationIcon width={16} height={16} />
          <Text type="caption" color="white">
            {address}
          </Text>
        </Styled.InfoRow>

        {isApartment && (
          <>
            {totalSquare && (
              <Styled.InfoRow>
                <Styled.Icon>📐</Styled.Icon>
                <Text type="body" color="white">
                  {totalSquare} m²
                </Text>
              </Styled.InfoRow>
            )}

            {bedrooms && (
              <Styled.InfoRow>
                <Styled.Icon>🛏️</Styled.Icon>
                <Text type="body" color="white">
                  {bedrooms} {bedrooms === 1 ? 'bedroom' : 'bedrooms'}
                </Text>
              </Styled.InfoRow>
            )}
          </>
        )}
      </Styled.InfoSection>

      {/* Price and Action Section */}
      <Styled.ActionSection>
        <ShareButton size="medium" url={shareUrl} />

        <Styled.PriceContainer>
          {hasDiscount && (
            <Styled.OldPrice>
              <Text type="body" customColor="rgba(255, 255, 255, 0.5)">
                {price.toLocaleString()} {currency}/ Day
              </Text>
            </Styled.OldPrice>
          )}
          <Text type="h6" color="accentRed" fontWeight="600">
            {totalPrice.toLocaleString()} {currency}/ Day
          </Text>
        </Styled.PriceContainer>

        <Styled.ActionButton onClick={handleMoreInfo}>
          <Text type="body" color="white" fontWeight="600">
            More information »
          </Text>
        </Styled.ActionButton>
      </Styled.ActionSection>
    </Styled.Card>
  );
};

export default RentalItemCard;

