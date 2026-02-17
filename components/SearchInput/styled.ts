import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const SearchWrapper = styled.div<{ $maxWidth?: string }>`
  position: relative;
  flex: 1;
  max-width: ${({ $maxWidth }) => $maxWidth || '600px'};

  @media (max-width: 968px) {
    max-width: 100%;
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

export const StyledSearchInput = styled.input<{ $hasIcon?: boolean }>`
  width: 100%;
  padding: 0.75rem 1.25rem 0.75rem ${({ $hasIcon }) => ($hasIcon ? '3.25rem' : '1.5rem')};
  border-radius: 50px;
  border: 1px solid ${COLORS.borderColor};
  background: transparent;
  color: ${COLORS.white};
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${COLORS.secondarySemiLight};
  }

  &:hover {
    border-color: ${COLORS.brandOrangeMid};
  }

  &:focus {
    border-color: ${COLORS.brandOrangeMid};
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const SearchResults = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: ${COLORS.darkBgSemi};
  border-radius: 16px;
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1001;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  max-height: 240px;
  overflow-y: auto;
`;

export const SearchResultItem = styled.li`
  padding: 0.75rem 1.25rem;
  color: ${COLORS.white};
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${COLORS.brandOrangeMid};
  }
`;
