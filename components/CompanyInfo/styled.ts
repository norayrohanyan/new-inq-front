import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

export const InfoContainer = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 100px;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    position: static;
    max-width: 100%;
    padding: 0;
  }
`;

export const DetailsWrapper = styled.div<{ $isOpen: boolean; $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    overflow: hidden;
  }

  @media (min-width: ${MOBILE_SIZE_BREAKPOINT + 1}px) {
    max-height: none;
    overflow: visible;
  }
`;

export const DetailsContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HeaderSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: flex-start;
`;

export const LogoWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: ${COLORS.darkBg};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0; /* Allow text truncation */
`;

export const AddressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${COLORS.secondarySemiLight};
    flex-shrink: 0;
  }
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${COLORS.brandOrangeMid};
    flex-shrink: 0;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  height: 100%;
  align-items: center;
`;

export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${COLORS.borderColor};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${COLORS.brandOrangeMid};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: scale(1.05);
  }
`;

export const TwoColumnSection = styled.div`
  display: flex;
  gap: 1rem;
`;

export const PhoneAndSocialSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 140px;
`;

export const PhoneSection = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 12px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const PhoneRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  svg {
    color: ${COLORS.secondarySemiLight};
    flex-shrink: 0;
  }
`;

export const SocialSection = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 12px;
  padding: 0.75rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SocialRow = styled.div`
  display: contents;
`;

export const SocialButton = styled.a`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${COLORS.borderColor};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${COLORS.brandOrangeMid};
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: scale(1.05);
    border-color: ${COLORS.brandOrangeMid};
  }

  svg {
    fill: ${COLORS.brandOrangeMid};
  }
`;

export const WorkHoursSection = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 12px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: space-between;
  width: 100%;
`;

export const WorkHourRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
  
  > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  > *:last-child {
    text-align: right;
    flex-shrink: 0;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 180px;
  background: ${COLORS.darkBg};
  border-radius: 30px;
  overflow: hidden;

  iframe {
    border: none;
  }
`;

export const MobileToggleButton = styled.div`
  width: 100%;
  display: flex;
`;