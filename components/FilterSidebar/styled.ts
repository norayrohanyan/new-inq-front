import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9998;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: ${COLORS.darkBg};
  z-index: 9999;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${COLORS.borderColor};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.white};
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${COLORS.brandOrangeMid};
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${COLORS.darkBgSemi};
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.borderColor};
    border-radius: 3px;
  }
`;

export const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${COLORS.borderColor};
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${COLORS.borderColor};
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const ExpandIcon = styled.span<{ expanded?: boolean }>`
  color: ${COLORS.brandOrangeMid};
  font-size: 24px;
  font-weight: 300;
  transition: transform 0.2s ease;
  transform: rotate(${({ expanded }) => (expanded ? '45deg' : '0deg')});
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const RadioButton = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  min-width: 20px;
  border-radius: 50%;
  border: 2px solid ${({ checked }) => (checked ? COLORS.brandOrangeMid : COLORS.borderColor)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease;
`;

export const RadioInner = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${COLORS.brandOrangeMid};
`;

export const CheckboxOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const Checkbox = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  min-width: 20px;
  border-radius: 4px;
  border: 2px solid ${({ checked }) => (checked ? COLORS.brandOrangeMid : COLORS.borderColor)};
  background: ${({ checked }) => (checked ? COLORS.brandOrangeMid : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s ease;
`;

export const Footer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${COLORS.borderColor};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.white};
  font-size: 14px;
  cursor: pointer;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${COLORS.brandOrangeMid};
  }
`;

