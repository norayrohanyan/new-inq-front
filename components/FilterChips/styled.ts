import { MOBILE_SIZE_BREAKPOINT } from '@/consts';
import { COLORS } from '@/consts/colors';
import styled from 'styled-components';

export const ChipsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 0 4rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 0 1rem;
  }
`;

export const ChipsWrapperContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(to left, ${COLORS.darkBg} 0%, transparent 100%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.has-overflow::after {
    opacity: 1;
  }
`;

export const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-right: 12px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Chip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 14px;
  color: #ffffff;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
  white-space: nowrap;

  svg {
    cursor: pointer;
  }
`;

export const ChipLabel = styled.span`
  font-size: 14px;
  color: #ffffff;
`;

export const ClearAllChip = styled(Chip)`
  background-color: rgba(255, 67, 54, 0.2);
  border: 1px solid rgba(255, 67, 54, 0.3);
  flex-shrink: 0;

  &:hover {
    background-color: rgba(255, 67, 54, 0.3);
  }
`;
