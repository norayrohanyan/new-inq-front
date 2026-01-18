import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '@/consts/colors';
import Text from '@/components/Text';

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px 60px 60px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 32px;
  }
`;

export const HeroBanner = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, ${COLORS.brandOrangeMid} 0%, #FFB84D 100%);
  border-radius: 24px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 250px;
    padding: 24px;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;

export const HeroPlaceholders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
`;

export const PlaceholderBox = styled.div`
  width: 80px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
`;

export const PlaceholderArrow = styled.div`
  width: 80px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  
  &::after {
    content: '→';
  }
`;

export const SliderDots = styled.div`
  display: flex;
  gap: 8px;
  align-self: center;
`;

export const Dot = styled.div<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $active }) => $active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
`;

export const DiscoverSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 900px;
  margin: 0 auto;
`;

export const DiscoverHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const HighlightText = styled.span`
  background: linear-gradient(135deg, #F6572F 0%, #FE7F3B 50%, #FEB245 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;


export const CategoriesGrid = styled(motion.div)`
  display: flex;
  gap: 32px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CategoryContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: flex-end;
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`;

export const CategoryCard = styled(motion.div)<{ $bgImage?: string }>`
  background: ${({ $bgImage }) =>
    $bgImage
      ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${$bgImage})`
      : COLORS.darkBgSemi
  };
  background-size: cover;
  background-position: center;
  border-radius: 40px;
  overflow: hidden;
  position: relative;
  width: 256px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(0) scale(1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(246, 87, 47, 0) 0%, rgba(254, 127, 59, 0.1) 50%, rgba(254, 178, 69, 0.2) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    transform: translateY(-8px) scale(1.02);

    &::before {
      opacity: 1;
    }

    ${CategoryContent} {
      transform: translateY(-4px);
    }
  }

  &:active {
    transform: translateY(-4px) scale(0.98);
    transition: all 0.1s ease;
  }
`;

export const ExploreIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 400;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: rotate(-45deg);
  transform-origin: center;
  transform-box: fill-box;
  transform-origin: center;
`;

export const ExploreContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: auto;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

export const ExploreCard = styled(motion.div)`
background: linear-gradient(157.18deg, #F6572F 22.32%, #FE7F3B 47.72%, #FEB245 73.63%);
  border-radius: 40px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 256px;
  height: 400px;
  cursor: pointer;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transform: translateY(0) scale(1);

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    transition: all 0.4s ease;
  }

  &::before {
    top: 20%;
    left: 20%;
    width: 100px;
    height: 100px;
    animation: bubble-float-1 4s ease-in-out infinite;
  }

  &::after {
    bottom: 15%;
    right: 15%;
    width: 120px;
    height: 120px;
    animation: bubble-float-2 5s ease-in-out infinite 1s;
  }

  @keyframes bubble-float-1 {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.4;
    }
    50% {
      transform: translate(-20px, -30px) scale(1.3);
      opacity: 0;
    }
  }

  @keyframes bubble-float-2 {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.35;
    }
    50% {
      transform: translate(15px, 20px) scale(1.4);
      opacity: 0;
    }
  }

  &:hover {
    box-shadow: 0 20px 40px rgba(255, 130, 67, 0.2);
    transform: translateY(-8px) scale(1.02);

    ${ExploreContent} {
      transform: translateY(-4px);
    }
  }

  @keyframes bubble-float-1-hover {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translate(-25px, -35px) scale(1.4);
      opacity: 0.2;
    }
  }

  @keyframes bubble-float-2-hover {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.55;
    }
    50% {
      transform: translate(20px, 25px) scale(1.5);
      opacity: 0.15;
    }
  }

  &:active {
    transform: translateY(-4px) scale(0.98);
    transition: all 0.1s ease;
  }
`;

export const PartnerSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px 0;
`;

// Custom styled text wrappers for homepage
export const HeroTitle = styled(Text)`
  font-size: 56px;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: 0;
  text-align: left;
`;

export const DiscoverTitle = styled(Text)`
  font-size: 56px;
  font-weight: 400;
  line-height: 110%;
  letter-spacing: 0;
  text-align: center;
`;

export const DiscoverSubtitle = styled(Text)`
  font-size: 56px;
  font-weight: 300;
  line-height: 110%;
  letter-spacing: 0;
  text-align: center;
`;

// Error Page Styles
export const ErrorPageContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 80px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 400px);
  background: ${COLORS.darkBg};

  @media (max-width: 768px) {
    padding: 60px 20px;
    min-height: calc(100vh - 300px);
  }
`;

export const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const ErrorCode = styled(Text)`
  font-size: 180px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -4px;
  background: linear-gradient(135deg, #F6572F 0%, #FE7F3B 50%, #FEB245 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 120px;
  }
`;

export const ErrorTitle = styled(Text)`
  font-size: 76px;
  font-weight: 600;
  line-height: 145px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #999999;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const ErrorDescription = styled(Text)`
  font-size: 33px;
  line-height: 61px;
  max-width: 1200px;
  color: #F7F7F7;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ErrorButtonWrapper = styled.div`
  margin-top: 16px;
  
  button {
    min-width: 200px;
  }
`;