import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

export const PersonalContainer = styled.div`
  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-left: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    gap: 1rem;
    padding-bottom: 0;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  text-align: center;
`;

export const TicketsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TicketsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FavoritesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px 16px 56px;
  background: transparent;
  border: 1px solid ${COLORS.borderColor};
  border-radius: 60px;
  color: ${COLORS.white};
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${COLORS.secondarySemiLight};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.brandOrangeMid};
    background: rgba(255, 255, 255, 0.02);
  }
`;
