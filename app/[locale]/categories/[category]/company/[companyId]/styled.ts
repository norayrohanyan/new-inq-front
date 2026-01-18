import styled from 'styled-components';

export const BannerContent = styled.div`
  text-align: center;
  z-index: 1;
`;

export const BannerSubtitle = styled.div`
  margin-top: 0.5rem;
`;

export const MainContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  padding: 0 4rem 2rem 4rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 0 2rem 2rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem 1.5rem 1rem;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RightColumn = styled.div`
  @media (max-width: 1200px) {
    order: -1;
  }
`;

export const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
