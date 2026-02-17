import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const CardContainer = styled.div`
  background: rgba(48, 48, 48, 0.6);
  border-radius: 30px;
  padding: 1.25rem;
  display: flex;
  gap: 1.25rem;
  align-items: center;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(48, 48, 48, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const ImageWrapper = styled.div`
  width: 96px;
  height: 96px;
  min-width: 96px;
  background-color: #D2D2D2;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
`;

export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${COLORS.borderColor};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${COLORS.brandOrangeMid};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${COLORS.brandOrangeMid};
  }
`;

export const StatusBadge = styled.span<{ $isOpen: boolean }>`
  width: fit-content;
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background-color: ${({ $isOpen }) => ($isOpen ? '#4CAF50' : COLORS.accentRed)};
  color: ${COLORS.white};
  font-weight: 600;
  font-size: 0.75rem;
  margin-left: 0.5rem;
  text-transform: uppercase;
`;

export const DiscountText = styled.span`
  color: ${COLORS.accentRed};
  font-weight: 600;
  margin-left: 0.5rem;
  font-size: 0.875rem;
`;
