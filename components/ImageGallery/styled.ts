import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '@/consts/colors';

export const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const MainImage = styled.div`
  width: 100%;
  height: 400px;
  background: ${COLORS.darkBg};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

export const AnimatedImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

export const NoImage = styled.div`
  color: ${COLORS.secondarySemiLight};
  font-size: 1rem;
`;

export const ThumbnailsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const ScrollButton = styled.button`
  background: ${COLORS.darkBgSemi};
  border: 1px solid ${COLORS.borderColor};
  border-radius: 8px;
  width: 40px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${COLORS.white};
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: all 0.3s ease;

  &:hover {
    background: ${COLORS.darkBg};
    border-color: ${COLORS.brandOrangeMid};
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 60px;
    font-size: 1.2rem;
  }
`;

export const ThumbnailsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Thumbnail = styled.div<{ $active: boolean }>`
  width: 100px;
  height: 80px;
  background: ${COLORS.darkBg};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  border: 2px solid ${({ $active }) => ($active ? COLORS.brandOrangeMid : 'transparent')};
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: ${({ $active }) => ($active ? COLORS.brandOrangeMid : COLORS.borderColor)};
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 60px;
  }
`;

