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



