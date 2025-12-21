import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const PageContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 4rem;
  min-height: 100vh;

  @media (max-width: 968px) {
    padding: 1.5rem 1rem;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${COLORS.brandOrangeMid};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const ActionButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${COLORS.darkBgSemi};
  border: 1px solid ${COLORS.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    color: ${COLORS.white};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${COLORS.brandOrangeMid};
  }
`;

export const ContentSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
  max-width: 400px;
  width: 100%;

  @media (max-width: 1200px) {
    position: static;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid ${COLORS.borderColor};

  @media (max-width: 768px) {
    height: 250px;
  }
`;

export const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 24px;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${COLORS.borderColor};
`;

export const SpecificationsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SpecificationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0;
  border-bottom: 1px solid ${COLORS.borderColor};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

export const SpecificationLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${COLORS.secondarySemiLight};
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
`;

