import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { flexCenterMixin, boxShadowStyles, setCommonBorderStyles } from '@/styles/mixins';

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  ${flexCenterMixin()}
  background: linear-gradient(135deg, ${COLORS.primaryExtraLight} 0%, ${COLORS.primarySemiLight} 100%);
`;

export const ContentCard = styled.div`
  background: ${COLORS.white};
  border-radius: 16px;
  padding: 3rem;
  max-width: 450px;
  width: 100%;
  ${boxShadowStyles('shadow2')}
  border: 1px solid ${COLORS.borderColor};
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${COLORS.secondaryExtraDark};
  margin-bottom: 2rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.secondaryDark};
  margin-bottom: 0.5rem;
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
  margin-top: 0.5rem;

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

export const ErrorText = styled.p`
  font-size: 0.875rem;
  color: ${COLORS.accentRed};
  margin: 0;
  text-align: center;
`;

export const SuccessText = styled.p`
  font-size: 1rem;
  color: ${COLORS.lightGreen};
  margin: 0;
  text-align: center;
  line-height: 1.6;
`;

