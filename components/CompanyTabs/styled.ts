import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const TabsList = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid ${COLORS.borderColor};
  padding-bottom: 0;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const Tab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? COLORS.brandOrangeMid : 'transparent')};
  padding: 0.75rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-bottom-color: ${({ $active }) => ($active ? COLORS.brandOrangeMid : COLORS.secondarySemiLight)};
  }
`;

export const TabContent = styled.div`
  width: 100%;
`;

