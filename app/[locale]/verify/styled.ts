import { COLORS } from '@/consts/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export const Message = styled.p<{ $success?: boolean }>`
  font-size: 1rem;
  color: ${COLORS.secondaryExtraDark};
  margin: 0;
  text-align: center;
  line-height: 1.6;
  color: ${({ $success }) => $success ? COLORS.lightGreen : COLORS.secondaryExtraDark};
`;

export const ErrorText = styled.p`
  font-size: 1rem;
  color: ${COLORS.accentRed};
  margin: 0;
  text-align: center;
  line-height: 1.6;
`;  

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid ${COLORS.secondaryLight};
  border-top: 4px solid ${COLORS.primaryDark};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 40px;
  max-width: 500px;
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

export const ModalTitle = styled.h2`
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

export const ModalDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin: 0;
  text-align: center;
  line-height: 1.6;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  margin-top: 8px;
`;