import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

export const FilterButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: ${COLORS.darkBgSemi};
  border-radius: 50px;
  border: none;
  color: ${COLORS.white};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 0.5rem 0.75rem;
  }
`;

export const FilterIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${COLORS.borderColor};
  padding: 0.4rem;
  
  svg {
    color: ${COLORS.brandOrangeMid};
  }
`;
