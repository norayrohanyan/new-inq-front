import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const CardContainer = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 20px;
  padding: 16px;
  display: flex;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CompanyLogoWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background: ${COLORS.secondaryDark};

  @media (max-width: 768px) {
    width: 100%;
    height: 180px;
  }
`;

export const PlaceholderLogo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.secondarySemiLight};
  font-size: 1rem;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

export const ActionButton = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid ${({ $active }) => $active ? COLORS.brandOrangeMid : 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${COLORS.darkBgSemi};
    border-color: ${COLORS.brandOrangeMid};
  }
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

