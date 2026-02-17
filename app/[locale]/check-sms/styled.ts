import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.darkBg};
  padding: 2rem;
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
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

export const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin: 0;
  text-align: center;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Timer = styled.div`
  color: ${COLORS.white};
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  font-variant-numeric: tabular-nums;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const ResendButton = styled.button<{ $disabled: boolean }>`
  background: none;
  border: none;
  background: ${({ $disabled }) => $disabled ? 'rgba(255, 255, 255, 0.3)' : COLORS.brandGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  padding: 8px 16px;
  transition: opacity 0.3s;

  &:hover {
    opacity: ${({ $disabled }) => $disabled ? 1 : 0.8};
  }
`;
