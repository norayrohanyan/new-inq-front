import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.div<{ $isOpen: boolean; $hasError?: boolean; $hasValue: boolean }>`
  width: 100%;
  padding: 0 0 12px 0;
  padding-right: 32px;
  color: ${({ $hasValue }) => ($hasValue ? COLORS.white : 'rgba(255, 255, 255, 0.6)')};
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ $hasError }) => ($hasError ? COLORS.accentRed : 'rgba(255, 255, 255, 0.3)')};
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  position: relative;

  &:hover {
    border-bottom-color: ${({ $hasError }) => ($hasError ? COLORS.accentRed : 'rgba(255, 255, 255, 0.5)')};
  }
`;

export const DropdownArrow = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  pointer-events: none;
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${COLORS.darkBgSemi};
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 240px;
  overflow-y: auto;
  z-index: 50;
  scrollbar-width: thin;
  scrollbar-color: #4a4a4a #2a2a2a;

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
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  color: ${({ $isSelected }) => ($isSelected ? COLORS.white : 'rgba(255, 255, 255, 0.8)')};
  background: ${({ $isSelected }) => ($isSelected ? 'rgba(254, 127, 59, 0.2)' : 'transparent')};

  &:hover {
    background: ${({ $isSelected }) => ($isSelected ? 'rgba(254, 127, 59, 0.2)' : 'rgba(255, 255, 255, 0.05)')};
  }
`;
