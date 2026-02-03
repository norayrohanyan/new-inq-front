'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import * as Styled from '../styled';
import Text from '@/components/Text';

interface INearMeControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  radius: number;
  onRadiusChange: (radius: number) => void;
  hasLocation?: boolean;
  onGetLocation?: () => void;
  isLoadingLocation?: boolean;
}

const RADIUS_OPTIONS = [
  { value: '1000', label: '1 km' },
  { value: '2000', label: '2 km' },
  { value: '5000', label: '5 km' },
  { value: '10000', label: '10 km' },
  { value: '25000', label: '25 km' },
  { value: '50000', label: '50 km' },
];

export const NearMeControls: React.FC<INearMeControlsProps> = ({
  radius,
  onRadiusChange
}) => {
  const t = useTranslations();

  return (
    <Styled.ControlsSection>
      <Styled.RadiusControls>
        <Text type="body" color="white">{t('nearMe.radius')}</Text>
        <Styled.RadiusDropdown
          options={RADIUS_OPTIONS}
          value={radius.toString()}
          onChange={(value) => onRadiusChange(Number(value))}
          variant="filled"
        />
      </Styled.RadiusControls>
    </Styled.ControlsSection>
  );
};
