import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '@/consts/colors';

export const ModalContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackdropOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled(motion.div)`
  position: relative;
  max-height: 90vh;
  max-width: 90vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.darkBgSemi};
  border-radius: 24px;
  z-index: 1;
  overflow: auto;

  @media (max-width: 768px) {
    max-width: 95vw;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  font-size: 32px;
  opacity: 0.7;
  transition: opacity 0.2s;
  z-index: 2;

  &:hover {
    opacity: 1;
  }
`;

// Modal Dialog Styles
export const DialogContainer = styled.div`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  min-width: 300px;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    min-width: auto;
    padding: 32px 24px;
    gap: 20px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const DialogTitle = styled.h2`
  color: ${COLORS.white};
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const DialogDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
  width: 100%;
  max-width: 350px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

