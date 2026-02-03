import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 400px);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const RecoveryCard = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 32px 24px;
    gap: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
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

