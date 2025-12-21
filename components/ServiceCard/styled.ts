import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: ${COLORS.darkBgSemi};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  height: fit-content;
  min-height: auto;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ButtonsSection = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

