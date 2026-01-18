import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.darkBg};
  padding: 2rem;
`;

export const RegisterCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const LoginLink = styled.span`
  background: ${COLORS.brandGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
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
