import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const ReviewCardContainer = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 12px;
  }
`;

export const StarsContainer = styled.div`
  display: flex;
  gap: 4px;
  color: ${COLORS.secondaryLight};
`;

export const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
