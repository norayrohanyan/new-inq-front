import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';

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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    height: 200px;
  }
`;

// Categories Section
export const CategoriesSection = styled.div`
  padding: 0 4rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 1.5rem 1rem;
  }
`;

export const CategoriesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  background: ${COLORS.darkBgSemi};
  padding: 2rem 3rem;
  border-radius: 30px;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const CategoryChip = styled.button<{ $active: boolean }>`
  padding: 0.875rem 2rem;
  border-radius: 50px;
  border: ${({ $active }) => ($active ? 'none' : `1px solid ${COLORS.borderColor}`)};
  background: ${({ $active }) => ($active ? COLORS.brandGradient : 'transparent')};
  color: ${COLORS.white};
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ $active }) =>
      $active ? COLORS.brandGradient : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ $active }) => ($active ? 'transparent' : COLORS.brandOrangeMid)};
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.85rem;
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

  @media (max-width: 968px) {
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;
    align-items: stretch;
  }
`;

export const SearchFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  
  @media (max-width: 968px) {
    width: 100%;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: ${COLORS.darkBgSemi};
  border-radius: 50px;
  color: ${COLORS.white};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  svg {
    color: ${COLORS.brandOrangeMid};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 968px) {
    justify-content: center;
  }
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

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 600px;

  @media (max-width: 968px) {
    width: 100%;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  color: ${COLORS.secondarySemiLight};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1.25rem 0.75rem 3.25rem;
  border-radius: 50px;
  border: 1px solid ${COLORS.borderColor};
  background: transparent;
  color: ${COLORS.white};
  font-size: 0.95rem;

  &::placeholder {
    color: ${COLORS.secondarySemiLight};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.brandOrangeMid};
    background: rgba(255, 255, 255, 0.02);
  }

  transition: all 0.3s ease;
`;

// Content Section
export const ContentSection = styled.div`
  padding: 0 4rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 1.5rem 1rem;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 968px) {
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

export const FilterIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${COLORS.borderColor};
  padding: 0.4rem;
`;