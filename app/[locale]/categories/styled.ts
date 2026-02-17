import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT, TABLET_SIZE_BREAKPOINT } from '@/consts';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Main Container
export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.darkBg};
  max-width: 1600px;
  margin: 0 auto;
`;

// Banner Section
export const BannerSection = styled.div`
  padding: 2rem 4rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 1.5rem 1rem;
  }
`;

export const Banner = styled.div`
  height: 288px;
  background: ${COLORS.brandGradient};
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
  }

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    height: 200px;
  }
`;

// Combined Toggle and Search Section
export const ToggleSearchSection = styled.div`
  width: 100%;
  padding: 0 4rem 1.5rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;
    align-items: stretch;
    gap: 1rem;
  }
`;

// Toggle + Filter row for mobile
export const ToggleFilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

// Toggle Section
export const ToggleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${COLORS.darkBgSemi};
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 0.5rem 0.75rem;
  }
`;

export const ToggleLabel = styled.span<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.secondarySemiLight)};
  font-size: 0.95rem;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  transition: all 0.3s ease;
  white-space: nowrap;
`;

export const ToggleSwitch = styled.div`
  width: 44px;
  height: 24px;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${COLORS.borderColor};
  flex-shrink: 0;
`;

export const ToggleKnob = styled.div<{ $active: boolean }>`
  width: 18px;
  height: 18px;
  background: linear-gradient(92.57deg, #F6572F 0%, #FE7F3B 49.5%, #FEB245 100%);

  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${({ $active }) => ($active ? '2px' : '22px')};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

// Content Section
export const ContentSection = styled.div`
  padding: 0 4rem 2rem 4rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 0 1rem 1.5rem 1rem;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${TABLET_SIZE_BREAKPOINT}px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

// Loading State
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 1rem;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid ${COLORS.brandOrangeMid};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

// Empty State
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
  gap: 1rem;
`;

// Load More Container
export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;