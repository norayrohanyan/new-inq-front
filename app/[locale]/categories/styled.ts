import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';
import { flexCenterMixin } from '@/styles/mixins';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.darkBg};
`;


export const BannerContent = styled.div`
  max-width: 1400px;
  height: 288px;
  background: ${COLORS.brandGradient};
  border-radius: 24px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 2rem 1.5rem;
  }
`;

export const ContentSection = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const CategoriesChips = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${COLORS.darkBgSemi};
  border-radius: 30px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 0.75rem;
  }
`;

export const CategoryChip = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  border: ${({ $active }) =>
    $active ? 'none' : `1px solid ${COLORS.borderColor}`};
  background: ${({ $active }) =>
    $active ? COLORS.brandGradient : 'transparent'};
  color: ${COLORS.white};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-size: 0.9rem;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    background: ${({ $active }) =>
      $active ? COLORS.brandGradient : 'rgba(255, 255, 255, 0.05)'};
    border-color: ${({ $active }) =>
      $active ? 'transparent' : COLORS.brandOrangeMid};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1.5rem;
    font-size: 0.85rem;
  }
`;

export const LoadingContainer = styled.div`
  ${flexCenterMixin()}
  flex-direction: column;
  min-height: 60vh;
  gap: 1rem;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid ${COLORS.brandOrangeMid};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

export const ErrorContainer = styled.div`
  ${flexCenterMixin()}
  flex-direction: column;
  min-height: 60vh;
  gap: 1rem;
  text-align: center;
  padding: 2rem;

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: ${COLORS.white};
    background: ${COLORS.brandGradient};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${COLORS.brandOrangeMid}40;
    }
  }
`;

export const EmptyState = styled.div`
  ${flexCenterMixin()}
  flex-direction: column;
  min-height: 60vh;
  text-align: center;
  gap: 1rem;
  padding: 2rem;
`;

