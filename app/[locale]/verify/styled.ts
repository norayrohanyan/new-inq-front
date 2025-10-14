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
`;

export const LoadingSpinner = styled.div`
  border: 4px solid ${COLORS.secondaryLight};
  border-top: 4px solid ${COLORS.primaryDark};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
`;