import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@/components/icons/starIcon';
import { LocationIcon } from '@/components/icons/location';
import { ClockIcon } from '@/components/icons/clock';
import { PhoneIcon } from '@/components/icons/phone';
import { ShareIcon } from '@/components/icons/share';
import { FavoriteButton } from '@/components/FavoriteButton';
import Text from '@/components/Text';
import * as Styled from './styled';

interface WorkHours {
  [key: string]: string;
}

interface IFavoriteCardProps {
  id: number;
  category: string;
  logo?: string;
  name: string;
  rating: string;
  address: string;
  workHours: string | WorkHours;
  phone?: string;
  onShare?: (id: number) => void;
  onClick?: (id: number) => void;
}

const FavoriteCard: React.FC<IFavoriteCardProps> = ({
  id,
  category,
  logo,
  name,
  rating,
  address,
  workHours,
  phone,
  onShare,
  onClick,
}) => {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(id);
  };

  // Format work hours - handle both string and object formats
  const formatWorkHours = (hours: string | WorkHours): string => {
    if (typeof hours === 'string') {
      return hours;
    }
    
    if (typeof hours === 'object' && hours !== null) {
      // If it's an object with day keys, format it nicely
      // Example: "Mon-Fri: 9:00-18:00"
      const days = Object.keys(hours);
      if (days.length === 0) return 'N/A';
      
      // Get today's day name
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      
      // If today exists in the hours object, show today's hours
      if (hours[today]) {
        return `${today}: ${hours[today]}`;
      }
      
      // Otherwise show first available day
      const firstDay = days[0];
      return `${firstDay}: ${hours[firstDay]}`;
    }
    
    return 'N/A';
  };

  return (
    <Styled.CardContainer onClick={() => onClick?.(id)}>
      {/* Company Logo */}
      <Styled.CompanyLogoWrapper>
        {logo ? (
          <Image
            src={logo}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <Styled.PlaceholderLogo />
        )}
      </Styled.CompanyLogoWrapper>

      {/* Info Section */}
      <Styled.InfoSection>
        <Styled.TopRow>
          <Text type="h4" color="white" fontWeight="500">
            {name}
          </Text>
          <Styled.Actions>
            <Styled.ActionButton onClick={handleShare}>
              <ShareIcon width="12" height="12" />
            </Styled.ActionButton>
            <FavoriteButton
              companyId={id}
              category={category}
              size="small"
            />
          </Styled.Actions>
        </Styled.TopRow>

        <Styled.RatingRow>
          <StarIcon width="16" height="16" />
          <Text type="body" color="white" fontWeight="500">
            {rating}
          </Text>
        </Styled.RatingRow>

        <Styled.DetailRow>
          <LocationIcon width="16" height="16" />
          <Text type="caption" color="white">
            {address}
          </Text>
        </Styled.DetailRow>

        <Styled.DetailRow>
          <ClockIcon width="16" height="16" />
          <Text type="caption" color="white">
            {formatWorkHours(workHours)}
          </Text>
        </Styled.DetailRow>

        {phone && (
          <Styled.DetailRow>
            <PhoneIcon width="16" height="16" />
            <Text type="caption" color="white">
              {phone}
            </Text>
          </Styled.DetailRow>
        )}
      </Styled.InfoSection>
    </Styled.CardContainer>
  );
};

export default FavoriteCard;

