import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import Text from '@/components/Text';
import { flexCenterMixin } from '@/styles/mixins';

export const PaginationContainer = styled.div`
  ${flexCenterMixin()}
  margin-top: 2rem;
  gap: 0.5rem;
`;

export const PageButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  ${flexCenterMixin()}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${({ $active }) => ($active ? 'none' : `1px solid ${COLORS.borderColor}`)};
  background: ${({ $active }) =>
    $active ? COLORS.brandGradient : 'rgba(255, 255, 255, 0.05)'};
  color: ${COLORS.white};
  font-size: 1rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;

  &:not(:disabled):hover {
    background: ${({ $active }) =>
      $active ? COLORS.brandGradient : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const ArrowButton = styled(PageButton)`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 0.8rem;
`;
