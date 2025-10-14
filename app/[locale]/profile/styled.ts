import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.darkBg};
  padding-top: 2rem;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 100px;

  @media (max-width: 968px) {
    position: static;
  }
`;

export const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MenuItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 0.5px solid ${COLORS.borderColor};
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  text-align: left;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};

  &:hover {
    font-weight: 600;
    border-bottom-color: rgba(255, 255, 255, 0.4);
  }
`;

export const MenuIcon = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  text-align: left;

  &:hover {
    background: rgba(255, 59, 48, 0.1);
    border-color: rgba(255, 59, 48, 0.3);
  }
`;

export const MainContent = styled.main`
  min-height: 600px;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
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

