import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

export const Card = styled.div`
  display: flex;
  gap: 1.5rem;
  background: ${COLORS.darkBgSemi};
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 16px;
  }
`;

export const ImageSection = styled.div`
  flex-shrink: 0;
  width: 170px;

`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  background: ${COLORS.darkBg};

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    border-radius: 12px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NavButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.$position === 'left' ? 'left: 12px;' : 'right: 12px;')}
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }
`;

export const ImageIndicator = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
  z-index: 2;
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    gap: 0.5rem;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    gap: 0.375rem;
  }
`;

export const Icon = styled.span`
  font-size: 18px;
  flex-shrink: 0;
`;

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  min-width: 240px;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    align-items: start;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.75rem;
  }
`;

export const ShareButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${COLORS.darkBg};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;

  &:hover {
    background: ${COLORS.darkBgSemi};
    transform: scale(1.1);
  }

  svg {
    color: ${COLORS.brandOrangeMid};
  }

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    width: 36px;
    height: 36px;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;

`;

export const OldPrice = styled.div`
  text-decoration: line-through;
  opacity: 0.7;
`;

export const ActionButton = styled.button`
  background: ${COLORS.brandGradient};
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(246, 87, 47, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

