import React from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence } from 'framer-motion';
import Text from '@/components/Text';
import Button from '@/components/Button';
import {
  PhoneIcon,
  LocationIcon,
  StarIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WebsiteIcon,
  YoutubeIcon,
  TelegramIcon,
  WhatsappIcon,
} from '@/components/icons';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareButton } from '@/components/ShareButton';
import { useIsMobile } from '@/hooks/useIsMobile';
import * as Styled from './styled';

const EXTERNAL_LINK_ICONS: Record<string, React.FC<{ width?: number; height?: number }>> = {
  website: WebsiteIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsappIcon,
  linkedin: LinkedinIcon,
};

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
    Sunday: string | string[] | null;
    Monday: string | string[] | null;
    Tuesday: string | string[] | null;
    Wednesday: string | string[] | null;
    Thursday: string | string[] | null;
    Friday: string | string[] | null;
    Saturday: string | string[] | null;
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
  const isMobile = useIsMobile();
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

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
          <ShareButton size="small" />
          <FavoriteButton companyId={companyId} category={category} size="small" />
        </Styled.ActionButtons>
      </Styled.HeaderSection>

      {/* Description */}
      {description && (
        <Text type="caption" color="white">
          {description}
        </Text>
      )}

      {/* Mobile Toggle Button */}
      {isMobile && (
        <Styled.MobileToggleButton>
          <Button 
            variant="primary" 
            size="medium" 
            rounded
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          >
            {isDetailsOpen ? t('common.close') : t('common.info')}
          </Button>
        </Styled.MobileToggleButton>
      )}

      {/* Collapsible Details Section */}
      <Styled.DetailsWrapper $isOpen={isDetailsOpen} $isMobile={isMobile}>
        <AnimatePresence initial={false}>
          {(!isMobile || isDetailsOpen) && (
            <Styled.DetailsContent
              key="details"
              initial={isMobile ? { height: 0, opacity: 0 } : undefined}
              animate={isMobile ? { height: 'auto', opacity: 1 } : undefined}
              exit={isMobile ? { height: 0, opacity: 0 } : undefined}
              transition={
                isMobile
                  ? {
                      height: { duration: 0.2, ease: 'easeOut' },
                      opacity: { duration: 0.15, ease: 'easeOut' },
                    }
                  : undefined
              }
            >
        {/* Two Column Section: Phone & Social (left) + Work Hours (right) */}
        <Styled.TwoColumnSection>
          {/* Phone and Social Section */}
          <Styled.PhoneAndSocialSection>

              {/* Social Media Links */}
            {externalLinks && Object.keys(externalLinks).length > 0 && (
              <Styled.SocialSection>
                {Object.entries(externalLinks).map(([key, url]) => {
                  const Icon = EXTERNAL_LINK_ICONS[key];
                  if (!Icon || !url) return null;
                  return (
                    <Styled.SocialButton key={key} href={url} target="_blank" rel="noopener noreferrer">
                      <Icon width={12} height={12} />
                    </Styled.SocialButton>
                  );
                })}
              </Styled.SocialSection>
            )}

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
          </Styled.PhoneAndSocialSection>

          {/* Work Hours */}
          <Styled.WorkHoursSection>
            {daysOfWeek.map((day) => {
              const hours = workHours[day as keyof typeof workHours];
              let displayHours = t('company.closed');

              if (hours) {
                if (Array.isArray(hours) && hours.length > 0) {
                  displayHours = hours.join(', ');
                } else if (typeof hours === 'string') {
                  displayHours = hours;
                }
              }

              return (
                <Styled.WorkHourRow key={day}>
                  <Text type="caption" color="white" fontWeight="600">
                    {day}
                  </Text>
                  <Text type="caption" color="white">
                    {displayHours}
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
            </Styled.DetailsContent>
          )}
        </AnimatePresence>
      </Styled.DetailsWrapper>
    </Styled.InfoContainer>
  );
};

export default CompanyInfo;

