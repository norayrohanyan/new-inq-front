import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

export const FooterContainer = styled.footer`
  background: ${COLORS.darkBgSemi};
  width: 100%;
  margin-top: auto;
`;

export const PartnerSection = styled.div`
  position: relative;
  border-top: 1px solid ${COLORS.borderColor};
  padding: 24px 0;
`;

export const PartnerContent = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

export const PartnerHighlight = styled.span`
  background: ${COLORS.brandGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;

export const MainFooter = styled.div`
  margin: 0 auto;
  padding: 32px 0;
  border-top: 1px solid ${COLORS.borderColor};
  max-width: 1400px;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 24px 0;
  }
`;

export const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
  }
`;

export const ContactSection = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    flex-direction: column;
    gap: 1rem;
  }
`;


export const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: ${COLORS.white};
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
    transform: translateX(2px);
  }

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    justify-content: center;
  }
`;

export const ContactIcon = styled.span`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    justify-content: center;
  }
`;

export const SocialLink = styled.a`
  padding: 12px;
  border-radius: 50%;
  border: 0.6px solid ${COLORS.borderColor};

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  color: ${COLORS.white};

  &:hover {
    background-color: ${COLORS.borderColor};
  }

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 8px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

