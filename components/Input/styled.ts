import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const IconWrapper = styled.span`
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  pointer-events: none;

  svg {
    opacity: 0.8;
  }
`;

export const StyledInput = styled.input<{ $hasIcon?: boolean }>`
  width: 100%;
  padding: ${({ $hasIcon }) => ($hasIcon ? '1rem 1rem 1rem 3rem' : '1rem')};
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: ${COLORS.white};
  font-size: 1rem;
  transition: border-color 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom-color: ${COLORS.brandOrangeMid};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  font-size: 0.75rem;
  color: ${COLORS.accentRed};
`;

