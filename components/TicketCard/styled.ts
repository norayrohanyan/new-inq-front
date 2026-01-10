import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const CardContainer = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 20px;
  padding: 16px;
  width: 100%;
  max-width: 920px;
  min-height: 160px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const StatusSection = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
`;

export const StatusBadge = styled.div<{ $status: string }>`
  padding: 6px 16px;
  border-radius: 8px;
  background: ${({ $status }) => {
    switch ($status) {
      case 'primary':
        return COLORS.brandOrangeMid;
      case 'pending':
        return COLORS.secondary;
      case 'cancelled':
        return COLORS.accentRed;
      case 'approved':
        return '#4CAF50';
      default:
        return COLORS.secondary;
    }
  }};
  color: ${({ $status }) => ($status === 'primary' ? COLORS.black : COLORS.white)};
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${COLORS.secondarySemiLight};
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.white};
  }
`;

export const MenuDots = styled.span`
  font-size: 20px;
  line-height: 1;
  font-weight: bold;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: ${COLORS.secondary};

  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${COLORS.secondary};
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 100px;

  @media (max-width: 768px) {
    padding-right: 0;
    width: 100%;
  }
`;

export const DetailsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
    color: ${COLORS.brandOrangeMid};
  }
`;

export const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 16px;
  right: 48px;

  @media (max-width: 768px) {
    position: static;
    justify-content: flex-end;
    width: 100%;
    padding-right: 16px;
  }
`;

export const PriceIcon = styled.span`
  font-size: 20px;
  color: ${COLORS.brandOrangeMid};
  font-weight: bold;
`;

