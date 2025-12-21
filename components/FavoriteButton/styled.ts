import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

const sizeMap = {
  small: '32px',
  medium: '40px',
  large: '48px',
};

export const FavoriteButton = styled.button<{
  $isFavorite: boolean;
  $size: 'small' | 'medium' | 'large';
}>`
  width: ${({ $size }) => sizeMap[$size]};
  height: ${({ $size }) => sizeMap[$size]};
  border-radius: 50%;
  border: 1px solid ${COLORS.borderColor};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

