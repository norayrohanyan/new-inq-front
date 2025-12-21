import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

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

export const ContentCard = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 300px;

  @media (max-width: 768px) {
    padding: 32px 24px;
    gap: 20px;
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid ${COLORS.brandOrangeMid};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 0.8s linear infinite;
`;

export const FormContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 20px 0;
`;

export const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 20px 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const SuccessTitle = styled.h2`
  color: ${COLORS.white};
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ErrorTitle = styled.h2`
  color: ${COLORS.white};
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  margin-top: 8px;
`;
