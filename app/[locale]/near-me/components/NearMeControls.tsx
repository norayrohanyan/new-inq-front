'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LocationIcon } from '@/components/icons';
import * as Styled from '../styled';

interface INearMeControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  radius: number;
  onRadiusChange: (radius: number) => void;
  hasLocation: boolean;
  onGetLocation: () => void;
  isLoadingLocation?: boolean;
}

const RADIUS_OPTIONS = [
  { value: 1000, label: '1 km' },
  { value: 2000, label: '2 km' },
  { value: 5000, label: '5 km' },
  { value: 10000, label: '10 km' },
  { value: 25000, label: '25 km' },
  { value: 50000, label: '50 km' },
];

export const NearMeControls: React.FC<INearMeControlsProps> = ({
  searchTerm,
  onSearchChange,
  radius,
  onRadiusChange,
  hasLocation,
  onGetLocation,
  isLoadingLocation,
}) => {
  const t = useTranslations();

  return (
    <Styled.ControlsSection>
      <Styled.SearchWrapper>
        <Styled.SearchIcon>🔍</Styled.SearchIcon>
        <Styled.SearchInput
          type="text"
          placeholder={t('nearMe.searchPlaceholder') || 'Search places...'}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Styled.SearchWrapper>

      <Styled.RadiusControls>
        <Styled.RadiusLabel>Radius:</Styled.RadiusLabel>
        <Styled.RadiusSelect
          value={radius}
          onChange={(e) => onRadiusChange(Number(e.target.value))}
        >
          {RADIUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Styled.RadiusSelect>
      </Styled.RadiusControls>

      <Styled.LocationButton
        $active={hasLocation}
        onClick={onGetLocation}
        disabled={isLoadingLocation}
      >
        <LocationIcon width="18" height="18" />
        {isLoadingLocation 
          ? 'Getting location...' 
          : hasLocation 
            ? 'Location active' 
            : 'Use my location'}
      </Styled.LocationButton>
    </Styled.ControlsSection>
  );
};
