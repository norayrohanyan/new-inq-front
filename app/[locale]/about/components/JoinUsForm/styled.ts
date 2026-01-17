import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: ${COLORS.darkBgSemi};
  border-radius: 20px;
  padding: 40px;
  margin-top: 40px;
`;

export const FormTitle = styled.h2`
  text-align: center;
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 16px;
  color: ${COLORS.white};
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const FormDescription = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  line-height: 140%;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0 0 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ $hasError }) => ($hasError ? COLORS.accentRed : 'rgba(255, 255, 255, 0.3)')};
  color: ${COLORS.white};
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  transition: border-color 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-bottom-color: ${({ $hasError }) => ($hasError ? COLORS.accentRed : 'rgba(255, 255, 255, 0.6)')};
  }
`;

export const PhoneInputWrapper = styled.div<{ $hasError?: boolean }>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ $hasError }) => ($hasError ? COLORS.accentRed : 'rgba(255, 255, 255, 0.3)')};
  padding-bottom: 12px;

  &:focus-within {
    border-bottom-color: ${({ $hasError }) => ($hasError ? COLORS.accentRed : 'rgba(255, 255, 255, 0.6)')};
  }
`;

export const PhonePrefix = styled.span`
  color: ${COLORS.white};
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  margin-right: 8px;
`;

export const PhoneInput = styled.input`
  flex: 1;
  padding: 0;
  background: transparent;
  border: none;
  color: ${COLORS.white};
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
  }
`;

export const ErrorText = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: ${COLORS.accentRed};
`;

export const GeneralError = styled.div`
  text-align: center;
`;

export const SuccessMessage = styled.div`
  text-align: center;
  background: ${COLORS.darkBgSemi};
  border-radius: 16px;
  padding: 24px;
`;

export const SuccessIconWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
`;

export const SuccessTitle = styled.p`
  color: ${COLORS.white};
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 120%;
  margin-bottom: 8px;
`;

export const SuccessText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
`;

export const SubmitButton = styled.button<{ $isDisabled: boolean }>`
  background: ${COLORS.brandGradient};
  color: ${COLORS.white};
  width: 100%;
  border-radius: 50px;
  padding: 12px 48px;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
  border: none;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  transition: opacity 0.3s;

  &:hover {
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 0.9)};
  }
`;
