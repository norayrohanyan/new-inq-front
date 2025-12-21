import React from 'react';
import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { PhoneIcon, LocationIcon, StarIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from '@/components/icons';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareIcon } from '@/components/icons';
import * as Styled from './styled';

interface ICompanyInfoProps {
  companyId: number;
  category: string;
  logo: string;
  name: string;
  rating: string;
  address: string;
  description: string;
  phones: string[];
  workHours: {
    Sunday: string[] | null;
    Monday: string[] | null;
    Tuesday: string[] | null;
    Wednesday: string[] | null;
    Thursday: string[] | null;
    Friday: string[] | null;
    Saturday: string[] | null;
  };
  externalLinks?: Record<string, string>;
}

const CompanyInfo: React.FC<ICompanyInfoProps> = ({
  companyId,
  category,
  logo,
  name,
  rating,
  address,
  description,
  phones,
  workHours,
  externalLinks,
}) => {
  const t = useTranslations();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Styled.InfoContainer>
      {/* Header with Logo and Name */}
      <Styled.HeaderSection>
        <Styled.LogoWrapper>
          {logo ? (
            <img src={logo} alt={name} />
          ) : (
            <Text type="body" color="secondarySemiLight">
              No Logo
            </Text>
          )}
        </Styled.LogoWrapper>
        <Styled.HeaderContent>
          <Text type="h6" color="white" fontWeight="700">
            {name}
          </Text>
          <Styled.AddressRow>
            <LocationIcon width={14} height={14} />
            <Text type="caption" color="secondarySemiLight">
              {address}
            </Text>
          </Styled.AddressRow>
          <Styled.RatingRow>
            <StarIcon width={16} height={16} />
            <Text type="caption" color="white" fontWeight="600">
              {rating}
            </Text>
          </Styled.RatingRow>
        </Styled.HeaderContent>
        <Styled.ActionButtons>
          <Styled.ActionButton>
            <ShareIcon width={12} height={12} />
          </Styled.ActionButton>
          <FavoriteButton companyId={companyId} category={category} size="small" />
        </Styled.ActionButtons>
      </Styled.HeaderSection>

      {/* Description */}
      {description && (
        <Text type="caption" color="white">
          {description}
        </Text>
      )}

      {/* Two Column Section: Phone & Social (left) + Work Hours (right) */}
      <Styled.TwoColumnSection>
        {/* Phone and Social Section */}
        <Styled.PhoneAndSocialSection>
          {/* Phones */}
          {phones && phones.length > 0 && (
            <Styled.PhoneSection>
              {phones.map((phone, index) => (
                <Styled.PhoneRow key={index}>
                  <PhoneIcon width={18} height={18} />
                  <Text type="caption" color="white">
                    {phone}
                  </Text>
                </Styled.PhoneRow>
              ))}
            </Styled.PhoneSection>
          )}

          {/* Social Media Links */}
          {externalLinks && Object.keys(externalLinks).length > 0 && (
            <Styled.SocialSection>
              {externalLinks.facebook && (
                <Styled.SocialButton href={externalLinks.facebook} target="_blank">
                  <FacebookIcon width={12} height={12} />
                </Styled.SocialButton>
              )}
              {externalLinks.instagram && (
                <Styled.SocialButton href={externalLinks.instagram} target="_blank">
                  <InstagramIcon width={12} height={12} />
                </Styled.SocialButton>
              )}
              {externalLinks.linkedin && (
                <Styled.SocialButton href={externalLinks.linkedin} target="_blank">
                  <LinkedinIcon width={12} height={12} />
                </Styled.SocialButton>
              )}
              {externalLinks.twitter && (
                <Styled.SocialButton href={externalLinks.twitter} target="_blank">
                  <FacebookIcon width={12} height={12} />
                </Styled.SocialButton>
              )}
              {externalLinks.youtube && (
                <Styled.SocialButton href={externalLinks.youtube} target="_blank">
                  <FacebookIcon width={12} height={12} />
                </Styled.SocialButton>
              )}
            </Styled.SocialSection>
          )}
        </Styled.PhoneAndSocialSection>

        {/* Work Hours */}
        <Styled.WorkHoursSection>
          {daysOfWeek.map((day) => {
            const hours = workHours[day as keyof typeof workHours];
            return (
              <Styled.WorkHourRow key={day}>
                <Text type="caption" color="white" fontWeight="600">
                  {day}
                </Text>
                <Text type="caption" color="white">
                  {hours && Array.isArray(hours) && hours.length > 0
                    ? hours.join(', ')
                    : t('company.closed')}
                </Text>
              </Styled.WorkHourRow>
            );
          })}
        </Styled.WorkHoursSection>
      </Styled.TwoColumnSection>

      {/* Map */}
      <Styled.MapPlaceholder>
        <Text type="body" color="secondarySemiLight">
          Map
        </Text>
      </Styled.MapPlaceholder>
    </Styled.InfoContainer>
  );
};

export default CompanyInfo;

