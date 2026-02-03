import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { setCommonBorderStyles } from '@/styles/mixins';

export const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: ${COLORS.white};
  border-radius: 12px;
  border: 1px solid ${COLORS.borderColor};
  box-shadow: 0px 4px 16px rgba(56, 102, 255, 0.1);
`;

// Title is now replaced by Text component

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

// Label is now replaced by Text component

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  background: ${COLORS.white};
  transition: all 0.2s ease;
  ${setCommonBorderStyles()}

  &:disabled {
    background: ${COLORS.secondaryUltraLight};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: ${COLORS.secondaryLight};
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.white};
  background: ${COLORS.primaryDark};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${COLORS.primaryExtraDark};
    transform: translateY(-1px);
    box-shadow: 0px 4px 12px rgba(56, 102, 255, 0.3);
  }

  &:disabled {
    background: ${COLORS.secondaryLight};
    cursor: not-allowed;
    transform: none;
  }
`;

export const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${COLORS.white};
  border-radius: 8px;
  ${setCommonBorderStyles()}
`;

export const PhonePrefix = styled.span`
  color: ${COLORS.secondaryExtraDark};
  font-size: 1rem;
  padding: 0.75rem 0 0.75rem 1rem;
  white-space: nowrap;
`;

export const PhoneInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem 0.75rem 0.5rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: ${COLORS.secondaryExtraDark};
  font-size: 1rem;

  &::placeholder {
    color: ${COLORS.secondaryLight};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ErrorText and SuccessText are now replaced by Text component

