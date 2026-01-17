import styled, { css } from 'styled-components';
import { COLORS } from '@/consts/colors';

export const TabButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? COLORS.brandGradient : 'transparent'};
  color: ${COLORS.white};
  border: none;
  padding: 6px 16px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  white-space: nowrap;

  ${({ $active }) =>
    !$active &&
    css`
      &:hover {
        background: ${COLORS.darkBgSemi};
      }
    `}

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 14px;
  }
`;
