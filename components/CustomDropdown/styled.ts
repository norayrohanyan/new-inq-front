import styled, { css } from 'styled-components';
import { COLORS } from '@/consts/colors';

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const defaultButtonStyles = css<{ $hasError?: boolean; $hasValue: boolean }>`
  padding: 0 0 12px 0;
  padding-right: 32px;
  color: ${({ $hasValue }) => ($hasValue ? COLORS.white : 'rgba(255, 255, 255, 0.6)')};
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ $hasError }) => ($hasError ? COLORS.accentRed : 'rgba(255, 255, 255, 0.3)')};

  &:hover {
    border-bottom-color: ${({ $hasError }) => ($hasError ? COLORS.accentRed : 'rgba(255, 255, 255, 0.5)')};
  }
`;

const filledButtonStyles = css`
  padding: 1rem 1.25rem;
  padding-right: 48px;
  color: ${COLORS.white};
  background: ${COLORS.darkBgSemi};
  border: none;
  border-radius: 24px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const DropdownButton = styled.div<{ 
  $isOpen: boolean; 
  $hasError?: boolean; 
  $hasValue: boolean;
  $variant?: 'default' | 'filled';
}>`
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: ${({ $hasValue }) => ($hasValue ? '600' : '400')};
  line-height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $variant }) => $variant === 'filled' ? filledButtonStyles : defaultButtonStyles}
`;

export const DropdownArrow = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  right: ${({ $isOpen }) => '12px'};
  top: 50%;
  transform: translateY(-50%) ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  pointer-events: none;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};

  svg {
    width: 20px;
    height: 20px;
  }
`;

const defaultListStyles = css`
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const filledListStyles = css`
  border-radius: 24px;
  border: none;
`;

export const DropdownList = styled.div<{ $isOpen: boolean; $variant?: 'default' | 'filled' }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${COLORS.darkBgSemi};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-height: 240px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 100;
  scrollbar-width: thin;
  scrollbar-color: #4a4a4a #2a2a2a;

  /* Smooth transition */
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-8px')});
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;

  ${({ $variant }) => $variant === 'filled' ? filledListStyles : defaultListStyles}

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #2a2a2a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 4px;
  }
`;

export const DropdownOption = styled.div<{ $isSelected: boolean }>`
  padding: 1rem 1.25rem; 
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};
  line-height: 100%;
  color: ${({ $isSelected }) => ($isSelected ? COLORS.white : 'rgba(255, 255, 255, 0.7)')};
  background: ${({ $isSelected }) => ($isSelected ? 'rgba(254, 127, 59, 0.15)' : 'transparent')};
  border-bottom: 1px solid ${COLORS.borderColor};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ $isSelected }) => ($isSelected ? 'rgba(254, 127, 59, 0.15)' : 'rgba(255, 255, 255, 0.05)')};
    color: ${COLORS.white};
  }
`;
