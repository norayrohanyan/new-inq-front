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

export const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: border-color 0.3s;

  &:focus-within {
    border-bottom-color: ${COLORS.brandOrangeMid};
  }
`;

export const PhoneIconWrapper = styled.span`
  display: flex;
  align-items: center;
  opacity: 0.6;
  padding-right: 0.75rem;
`;

export const PhonePrefix = styled.span`
  color: ${COLORS.white};
  font-size: 1rem;
  padding: 1rem 0.5rem 1rem 0;
  white-space: nowrap;
`;

export const PhoneInput = styled.input`
  flex: 1;
  padding: 1rem 0;
  background: transparent;
  border: none;
  color: ${COLORS.white};
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
