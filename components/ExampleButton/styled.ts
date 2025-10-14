import styled, { css } from 'styled-components';
import { COLORS } from '@/consts/colors';
import { SMALL_DESKTOP_SIZE_BREAKPOINT } from '@/consts';

export const ButtonContainer = styled.button<{
  $disabled?: boolean;
  $variant: 'primary' | 'secondary';
  $isMobileDrawerStyle?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  ${({ $variant }) =>
    $variant === 'primary'
      ? css`
          background: ${COLORS.primaryDark};
          color: ${COLORS.white};
          border: 1px solid ${COLORS.primaryDark};

          @media (min-width: ${SMALL_DESKTOP_SIZE_BREAKPOINT}px) {
            &:hover {
              background: ${COLORS.primaryExtraDark};
              border-color: ${COLORS.primaryExtraDark};
            }
          }
        `
      : css`
          background: ${COLORS.white};
          color: ${COLORS.primaryDark};
          border: 1px solid ${COLORS.borderColor};

          @media (min-width: ${SMALL_DESKTOP_SIZE_BREAKPOINT}px) {
            &:hover {
              background: ${COLORS.primaryLight};
              border-color: ${COLORS.primaryDark};
            }
          }
        `}

  ${({ $isMobileDrawerStyle }) =>
    $isMobileDrawerStyle &&
    css`
      width: 100%;
      justify-content: center;
      padding: 16px 24px;
      font-size: 16px;
    `}
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

export const ButtonText = styled.span`
  line-height: 1.2;
`;

