import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';
import { SpinnerSize } from './index';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const getSizeStyles = (size: SpinnerSize) => {
  switch (size) {
    case 'small':
      return {
        width: '24px',
        height: '24px',
        borderWidth: '3px',
      };
    case 'medium':
      return {
        width: '40px',
        height: '40px',
        borderWidth: '4px',
      };
    case 'large':
      return {
        width: '56px',
        height: '56px',
        borderWidth: '5px',
      };
  }
};

export const SpinnerElement = styled.div<{ $size: SpinnerSize }>`
  ${({ $size }) => {
    const styles = getSizeStyles($size);
    return `
      width: ${styles.width};
      height: ${styles.height};
      border: ${styles.borderWidth} solid rgba(255, 255, 255, 0.2);
      border-top: ${styles.borderWidth} solid ${COLORS.brandOrangeMid};
    `;
  }}
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
