import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';
import Dropdown from '@/components/CustomDropdown';
import { DropdownButton } from '@/components/CustomDropdown/styled';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

// Main Container
export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.darkBg};
  max-width: 1600px;
  margin: 0 auto;
`;

// Controls Section
export const ControlsSection = styled.div`
  padding: 0 4rem 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;
    align-items: start;
  }
`;


export const RadiusControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${COLORS.darkBgSemi};
  padding: 0.5rem;
  padding-left: 1.5rem;
  border-radius: 50px;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    justify-content: start;
  }
`;

export const RadiusSelect = styled.select`
  background: transparent;
  border: 1px solid ${COLORS.borderColor};
  border-radius: 8px;
  color: ${COLORS.white};
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${COLORS.brandOrangeMid};
  }

  option {
    background: ${COLORS.darkBgSemi};
    color: ${COLORS.white};
  }
`;

export const LocationButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ $active }) => ($active ? COLORS.brandGradient : COLORS.darkBgSemi)};
  border: ${({ $active }) => ($active ? 'none' : `1px solid ${COLORS.borderColor}`)};
  border-radius: 50px;
  color: ${COLORS.white};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? COLORS.brandGradient : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ $active }) => ($active ? 'transparent' : COLORS.brandOrangeMid)};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// Map Section
export const MapSection = styled.div`
  padding: 0 4rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 1.5rem 1rem;
  }
`;

export const MapContainer = styled.div`
  height: 600px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  background: ${COLORS.darkBgSemi};

  @media (max-width: 768px) {
    height: 450px;
  }

  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: 24px;
  }

  .leaflet-popup-content-wrapper {
    background: ${COLORS.darkBgSemi};
    color: ${COLORS.white};
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .leaflet-popup-tip {
    background: ${COLORS.darkBgSemi};
  }

  .leaflet-popup-close-button {
    display: none;
  }

  .leaflet-control-zoom {
    border: none !important;
    border-radius: 12px !important;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .leaflet-control-zoom a {
    background: ${COLORS.darkBgSemi} !important;
    color: ${COLORS.white} !important;
    border: none !important;
    width: 36px !important;
    height: 36px !important;
    line-height: 36px !important;

    &:hover {
      background: ${COLORS.darkBg} !important;
      color: ${COLORS.brandOrangeMid} !important;
    }
  }

  .leaflet-control-locate {
    border: none !important;
    border-radius: 12px !important;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    margin-top: 10px !important;
  }

  .leaflet-control-locate a {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${COLORS.darkBgSemi} !important;
    color: ${COLORS.white} !important;
    border: none !important;
    width: 36px !important;
    height: 36px !important;
    border-radius: 12px !important;

    &:hover {
      background: ${COLORS.darkBg} !important;
      color: ${COLORS.brandOrangeMid} !important;

      .leaflet-control-locate-location-arrow {
        background-color: ${COLORS.brandOrangeMid} !important;
      }
    }
  }

  .leaflet-control-locate-location-arrow {
    background-color: ${COLORS.white} !important;
  }
`;

export const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(32, 32, 32, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  border-radius: 24px;
`;

export const MapOverlayIcon = styled.div`
  font-size: 4rem;
  color: ${COLORS.brandOrangeMid};
`;

export const MapOverlayText = styled.p`
  color: ${COLORS.white};
  font-size: 1.1rem;
  text-align: center;
  max-width: 300px;
`;

export const MapOverlayButton = styled.button`
  padding: 0.875rem 2rem;
  background: ${COLORS.brandGradient};
  border: none;
  border-radius: 50px;
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(254, 127, 59, 0.4);
  }
`;

// Loading State
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid ${COLORS.brandOrangeMid};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

export const LoadingText = styled.p`
  color: ${COLORS.secondarySemiLight};
  font-size: 0.95rem;
`;

// Popup Styles
export const PopupContainer = styled.div`
  padding: 0.5rem;
  min-width: 220px;
`;

export const PopupImage = styled.div<{ $src: string }>`
  width: 100%;
  height: 120px;
  border-radius: 12px;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  margin-bottom: 0.75rem;
`;

export const PopupTitle = styled.h3`
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

export const PopupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const PopupInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${COLORS.secondarySemiLight};
  font-size: 0.85rem;

  svg {
    flex-shrink: 0;
    color: ${COLORS.brandOrangeMid};
  }
`;

export const PopupStatus = styled.span<{ $isOpen: boolean }>`
  color: ${({ $isOpen }) => ($isOpen ? '#4CAF50' : COLORS.accentRed)};
  font-weight: 500;
`;

export const PopupRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${COLORS.brandOrangeEnd};
`;

export const PopupDistance = styled.span`
  color: ${COLORS.brandOrangeMid};
  font-weight: 500;
`;

export const PopupButton = styled.button`
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.625rem;
  background: ${COLORS.brandGradient};
  border: none;
  border-radius: 8px;
  color: ${COLORS.white};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(254, 127, 59, 0.3);
  }
`;

// User Location Marker
export const UserLocationMarker = styled.div`
  width: 20px;
  height: 20px;
  background: ${COLORS.primary};
  border: 3px solid ${COLORS.white};
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(56, 102, 255, 0.5);
  animation: ${pulse} 2s ease-in-out infinite;
`;

// Results Info
export const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${COLORS.secondarySemiLight};
  font-size: 0.9rem;
  padding: 0 4rem 0.5rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 0.5rem 1rem;
  }
`;

export const ResultsCount = styled.span`
  color: ${COLORS.brandOrangeMid};
  font-weight: 600;
`;

// Error State
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  text-align: center;
`;

export const ErrorIcon = styled.div`
  font-size: 3rem;
  color: ${COLORS.accentRed};
`;

export const ErrorText = styled.p`
  color: ${COLORS.white};
  font-size: 1rem;
  max-width: 300px;
`;

export const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid ${COLORS.brandOrangeMid};
  border-radius: 50px;
  color: ${COLORS.brandOrangeMid};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${COLORS.brandGradient};
    border-color: transparent;
    color: ${COLORS.white};
  }
`;

// Custom Dropdown
export const RadiusDropdown = styled(Dropdown)`
  z-index: 1000;
`;