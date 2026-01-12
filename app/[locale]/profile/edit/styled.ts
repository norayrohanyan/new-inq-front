import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const EditCard = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid ${COLORS.borderColor};
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
