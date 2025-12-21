import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  pointer-events: none;

  @media (max-width: 768px) {
    right: 10px;
    left: 10px;
  }
`;

export const Toast = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  background: ${({ $type }) =>
    $type === 'error'
      ? COLORS.accentRed
      : $type === 'success'
      ? '#4CAF50'
      : COLORS.brandOrangeMid};
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.3s ease-out;
  pointer-events: all;
  cursor: pointer;
  transition: transform 0.2s ease;
  min-width: 300px;
  max-width: 500px;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    min-width: unset;
    max-width: unset;
    width: 100%;
  }
`;


