import styled, { css, keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';
import { ButtonVariant, ButtonSize } from './index';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const getVariantStyles = ($variant: ButtonVariant) => {
  switch ($variant) {
    case 'primary':
      return css`
        background: ${COLORS.brandGradient};
        color: ${COLORS.white};
        border: none;

        &:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0px 8px 20px rgba(246, 87, 47, 0.3);
        }

        &:active:not(:disabled) {
          transform: translateY(0);
          filter: brightness(0.95);
        }
      `;
    case 'secondary':
      return css`
        background: ${COLORS.darkBg};
        color: ${COLORS.white};
        border: 2px solid ${COLORS.brandOrangeMid};

        &:hover:not(:disabled) {
          background: ${COLORS.brandOrangeMid};
          border-color: ${COLORS.brandOrangeMid};
          transform: translateY(-1px);
          box-shadow: 0px 8px 20px rgba(254, 127, 59, 0.3);
        }

        &:active:not(:disabled) {
          transform: translateY(0);
          background: ${COLORS.brandOrangeStart};
        }
      `;
  }
};

const getSizeStyles = ($size: ButtonSize) => {
  switch ($size) {
    case 'small':
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        border-radius: 6px;
      `;
    case 'medium':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 8px;
      `;
    case 'large':
      return css`
        padding: 1rem 2rem;
        font-size: 1.125rem;
        border-radius: 10px;
      `;
  }
};

export const Button = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading: boolean;
}>`
  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $size }) => getSizeStyles($size)}

  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  position: relative;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      color: transparent;
    `}
`;

export const Spinner = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${COLORS.white};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

