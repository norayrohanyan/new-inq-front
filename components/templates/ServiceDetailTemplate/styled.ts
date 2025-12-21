import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const PageContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;
`;

export const BannerSection = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 0 0 24px 24px;

  @media (max-width: 768px) {
    height: 250px;
    border-radius: 0 0 16px 16px;
  }
`;

export const BannerPlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, ${COLORS.darkBgSemi} 0%, ${COLORS.darkBg} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 24px 24px;

  @media (max-width: 768px) {
    height: 250px;
    border-radius: 0 0 16px 16px;
  }
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  padding: 0 4rem 4rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 0 2rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem 1.5rem;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RightColumn = styled.div`
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  @media (max-width: 1200px) {
    position: static;
    order: -1; // Show company info first on mobile
  }
`;

export const EmployeesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PortfolioSection = styled.div`
  width: 100%;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
`;

