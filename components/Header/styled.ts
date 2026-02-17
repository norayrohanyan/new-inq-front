import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import Link from 'next/link';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

export const HeaderContainer = styled.header`
  background: ${COLORS.darkBg};
  position: sticky;
  top: 0;
  z-index: 9999;
`;

export const Nav = styled.nav`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 2rem 1rem;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  flex: 1;
  margin-left: 3rem;
`;

export const NavLink = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  color: ${({ $isActive }) => ($isActive ? COLORS.brandOrangeMid : COLORS.white)};
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  position: relative;

  &:hover {
    color: ${COLORS.brandOrangeMid};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${COLORS.brandGradient};
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const LanguageSelector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const FlagButton = styled.button`
  background: transparent;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${COLORS.brandOrangeMid};
    transform: scale(1.05);
  }
`;

export const LanguageDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: ${COLORS.darkBgSemi};
  border: 1px solid ${COLORS.borderColor};
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

export const LanguageOption = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: ${COLORS.darkBg};
  }

  img {
    border-radius: 4px;
  }
`;

export const ProfileButton = styled.button`
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${COLORS.brandOrangeMid};
    transform: scale(1.05);
  }

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const LoginButton = styled.div`
  border: 0.5px solid ${COLORS.borderColor};
  transition: all 0.3s;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  color: ${COLORS.white};

  &:hover {
    background: ${COLORS.darkBgSemi} !important; 
    transform: translateY(-1px) !important;
    border-color: ${COLORS.white} !important;
  }
`;

// Mobile Menu Styles
export const MobileRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
`;

export const HamburgerLine = styled.span`
  width: 24px;
  height: 3px;
  background: ${COLORS.brandGradient};
  border-radius: 2px;
  transition: all 0.3s;
`;

export const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 92px; /* Height of the header */
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.darkBg};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  overflow-y: auto;
  z-index: 1002;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.38rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  gap: 2rem;
`;

export const MobileAuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 340px;
`;

export const MobileLoginButton = styled.div`
  flex: 1;
  border: 0.5px solid ${COLORS.borderColor};
  transition: all 0.3s;
  cursor: pointer;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  color: ${COLORS.white};
  text-align: center;
  font-weight: 500;

  &:hover {
    background: ${COLORS.darkBgSemi};
    border-color: ${COLORS.white};
  }
`;

export const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const MobileNavLink = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  color: ${({ $isActive }) => ($isActive ? COLORS.brandOrangeMid : COLORS.white)};
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 1px;
  transition: all 0.3s;
  padding: 0.75rem 1.5rem;

  &:hover {
    color: ${COLORS.brandOrangeMid};
  }
`;
