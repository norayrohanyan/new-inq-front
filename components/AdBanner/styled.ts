import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';

interface BannerContainerProps {
  height: string;
  mobileHeight: string;
}

export const BannerContainer = styled.div<BannerContainerProps>`
  width: 100%;
  height: ${props => props.height};
  background: linear-gradient(168.23deg, #F6572F 15.26%, #FE7F3B 49.45%, #FEB245 84.33%);
  border-radius: 30px;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: ${props => props.mobileHeight};
  }
`;

export const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const SliderTrack = styled.div<{ $currentIndex: number; $totalAds: number; $isTransitioning: boolean }>`
  display: flex;
  height: 100%;
  width: ${props => props.$totalAds * 100}%;
  transform: translateX(-${props => (props.$currentIndex * 100) / props.$totalAds}%);
  transition: ${props => props.$isTransitioning ? 'transform 0.5s ease-in-out' : 'none'};
`;

export const SlideItem = styled.div<{ $totalAds: number }>`
  flex: 0 0 ${props => 100 / props.$totalAds}%;
  width: ${props => 100 / props.$totalAds}%;
  height: 100%;
  position: relative;
`;

export const AdImage = styled.img<{ $clickable?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: transform 0.2s ease;

  &:hover {
    transform: ${props => props.$clickable ? 'scale(1.01)' : 'none'};
  }
`;

export const NavButton = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.$position}: 20px;
  transform: translateY(-50%);
  color: white;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  padding: 0;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${props => props.$position}: 10px;

    svg {
      width: 20px;
      height: 18px;
    }
  }
`;

export const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;

  @media (max-width: 768px) {
    bottom: 12px;
    gap: 6px;
  }
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${props => props.$active ? '24px' : '10px'};
  height: 10px;
  border-radius: 5px;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  }

  @media (max-width: 768px) {
    width: ${props => props.$active ? '20px' : '8px'};
    height: 8px;
  }
`;

export const PlaceholderContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px;
  gap: 40px;

  @media (max-width: 768px) {
    padding: 24px;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
`;

export const PlaceholderText = styled.h1`
  color: white;
  font-size: 72px;
  font-weight: 900;
  text-align: left;
  margin: 0;
  line-height: 1.1;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 32px;
    text-align: center;
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  flex: 1;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    gap: 12px;
  }
`;

export const SkeletonLine = styled.div<{ width: string }>`
  height: 40px;
  width: ${props => props.width};
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 1000px 100%;
  border-radius: 20px;

  @media (max-width: 768px) {
    height: 30px;
  }
`;

export const SkeletonCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 1px solid #FFFFFF99;
  border-radius: 50%;
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    right: 24px;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${COLORS.brandOrangeMid} 0%, #FFB84D 100%);
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
