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
  color: ${COLORS.brandOrangeMid};
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

export const CategoryCard = styled(motion.div)<{ $bgImage?: string }>`
  background: ${({ $bgImage }) => 
    $bgImage 
      ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${$bgImage})`
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
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
`;


export const CategoryContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: flex-end;
  z-index: 1;
`;

export const ExploreCard = styled(motion.div)`
  background: linear-gradient(135deg, ${COLORS.brandOrangeMid} 0%, #FFB84D 100%);
  border-radius: 40px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 256px;
  height: 400px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(255, 130, 67, 0.4);
  }
`;

export const ExploreIcon = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export const ExploreContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: auto;
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