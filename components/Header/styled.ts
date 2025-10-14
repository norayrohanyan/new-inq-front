import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import Link from 'next/link';

export const HeaderContainer = styled.header`
  background: ${COLORS.darkBg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

export const Logo = styled.div`
  a {
    text-decoration: none;
  }
`;

export const LogoText = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${COLORS.white};
  letter-spacing: -0.5px;
`;

export const LogoAccent = styled.span`
  background: ${COLORS.brandGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  flex: 1;
  margin-left: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.white};
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
  display: flex;
  align-items: center;
`;

export const FlagButton = styled.button`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${COLORS.brandOrangeMid};
    transform: scale(1.05);
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
