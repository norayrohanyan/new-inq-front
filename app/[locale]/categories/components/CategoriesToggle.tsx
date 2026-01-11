import React from 'react';
import { useTranslations } from 'next-intl';
import { ICategorySwitch } from '@/types/categories';
import * as Styled from '../styled';

interface ICategoriesToggleProps {
  showCompanies: boolean;
  onToggleChange: () => void;
  categorySwitch: ICategorySwitch;
}

export const CategoriesToggle: React.FC<ICategoriesToggleProps> = ({
  showCompanies,
  onToggleChange,
  categorySwitch,
}) => {
  const t = useTranslations();

  // Don't show toggle if switch is null or undefined
  if (!categorySwitch) {
    return null;
  }

  // Get all entries (both true and false values)
  const allEntries = Object.entries(categorySwitch);
  const trueValues = allEntries.filter(([_, value]) => value === true);
  const falseValues = allEntries.filter(([_, value]) => value === false);
  
  // Show toggle only if we have exactly 1 true and 1 false (total 2 options)
  if (trueValues.length !== 1 || falseValues.length !== 1) {
    return null;
  }

  // Get the option names
  const allOptions = [...trueValues, ...falseValues].map(([key]) => key);
  
  // Always put "Companies" on the left side for consistency
  // The other option (Services, Apartments, Cars) goes on the right
  const companiesKey = allOptions.find(key => key === 'Companies');
  const otherKey = allOptions.find(key => key !== 'Companies');
  
  const leftOption = companiesKey || allOptions[0];
  const rightOption = otherKey || allOptions[1];

  // Determine the labels based on the switch data
  const getLabel = (key: string) => {
    switch (key) {
      case 'Companies':
        return t('categories.companies');
      case 'Services':
        return t('categories.services');
      case 'Apartments':
        return t('categories.apartments');
      case 'Cars':
        return t('categories.cars');
      default:
        return key;
    }
  };

  const leftLabel = getLabel(leftOption);
  const rightLabel = getLabel(rightOption);

  // When showCompanies is true, the left side (Companies) should be active
  // When showCompanies is false, the right side (Services/Apartments/Cars) should be active
  const isLeftActive = showCompanies;
  const isRightActive = !showCompanies;

  return (
    <Styled.ToggleSection>
      <Styled.ToggleLabel $active={isLeftActive}>
        {leftLabel}
      </Styled.ToggleLabel>
      <Styled.ToggleSwitch onClick={onToggleChange}>
        <Styled.ToggleKnob $active={isLeftActive} />
      </Styled.ToggleSwitch>
      <Styled.ToggleLabel $active={isRightActive}>
        {rightLabel}
      </Styled.ToggleLabel>
    </Styled.ToggleSection>
  );
};

