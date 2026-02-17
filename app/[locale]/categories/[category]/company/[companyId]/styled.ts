import { MOBILE_SIZE_BREAKPOINT, TABLET_SIZE_BREAKPOINT } from '@/consts';
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
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  padding: 0 4rem 2rem 4rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 1rem;
    width: 100%;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
`;

export const RightColumn = styled.div`
  min-width: 0;
  overflow: hidden;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
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
