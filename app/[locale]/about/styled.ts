import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT, TABLET_SIZE_BREAKPOINT } from '@/consts';

export const PageContainer = styled.div`
  width: 100%;
  background: ${COLORS.darkBg};
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 60px 60px 80px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 32px 20px 60px;
    gap: 48px;
  }
`;

export const HeroSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 24px;
  min-height: 200px;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 48px 32px;
    min-height: 300px;
    gap: 16px;
  }
`;

export const TariffsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 8px;
  background: ${COLORS.darkBgSemi};
  border-radius: 50px;
  max-width: 466px;
  width: fit-content;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    width: 100%;
    max-width: 430px;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 8px;
    padding: 6px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const PricingCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    gap: 20px;
  }
`;

