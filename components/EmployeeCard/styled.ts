import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${COLORS.darkBgSemi};
  border-radius: 16px;
  padding: 1rem;
  gap: 1rem;
  transition: all 0.3s ease;


  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

export const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  min-width: 80px;
  background: ${COLORS.darkBg};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 86px;
    height: 86px;
    min-width: 86px;
  }
`;

export const NoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${COLORS.darkBg};
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  min-width: 0;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    gap: 12px;
  }
`;

export const NameProfessionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const CardFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  justify-content: space-between;
`;

