import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

// Categories Section
export const CategoriesSection = styled.div`
  padding: 0 4rem 2rem 4rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 0 1rem 1.5rem 1rem;
  }
`;

export const CategoriesGridWrapper = styled.div`
  position: relative;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 40px;
      background: linear-gradient(to left, ${COLORS.darkBgSemi} 0%, transparent 100%);
      pointer-events: none;
      border-radius: 0 30px 30px 0;
    }
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

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    padding-right: 2.5rem;
    border-radius: 30px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
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

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.85rem;
    flex-shrink: 0;
  }
`;
