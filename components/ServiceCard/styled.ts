import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${COLORS.darkBgSemi};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  height: fit-content;
  min-height: auto;
  width: 100%;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 1rem;
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
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
  flex-shrink: 0;
`;

export const DescriptionSection = styled.div`
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid ${COLORS.borderColor};
`;

