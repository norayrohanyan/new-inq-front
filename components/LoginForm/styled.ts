import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { setCommonBorderStyles } from '@/styles/mixins';

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: ${COLORS.white};
  border-radius: 12px;
  border: 1px solid ${COLORS.borderColor};
  box-shadow: 0px 4px 16px rgba(56, 102, 255, 0.1);
`;

// Title and Label are now replaced by Text component

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

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

// ErrorText is now replaced by Text component

