import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.darkBg};
  position: relative;
  padding-top: 2rem;
  margin-bottom: 2rem;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0;
  }
`;

export const Sidebar = styled.aside<{ $isOpen: boolean; $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 100px;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    position: fixed;
    left: 0;
    height: 100vh;
    width: 280px;
    background: ${COLORS.darkBg};
    backdrop-filter: blur(10px);
    z-index: 1001;
    padding: 2rem 1rem;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-out;
    overflow-y: auto;
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

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 0 1rem;
  }
`;

export const MobileMenuButton = styled.div`
  display: none;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: -0.5rem;
    width: 48px;
    height: 48px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;

export const ThreeDotsIcon = styled.span`
  font-size: 24px;
  color: ${COLORS.white};
  font-weight: bold;
  line-height: 1;
`;

export const Overlay = styled(motion.div)`
  display: none;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 1000;
  }
`;

