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
  const trueOption = trueValues[0][0];
  const falseOption = falseValues[0][0];
  
  // The true value should be on the left (default active position)
  const firstOption = trueOption;
  const secondOption = falseOption;

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

  const leftLabel = getLabel(firstOption);
  const rightLabel = getLabel(secondOption);

  return (
    <Styled.ToggleSection>
      <Styled.ToggleLabel $active={showCompanies}>
        {leftLabel}
      </Styled.ToggleLabel>
      <Styled.ToggleSwitch onClick={onToggleChange}>
        <Styled.ToggleKnob $active={showCompanies} />
      </Styled.ToggleSwitch>
      <Styled.ToggleLabel $active={!showCompanies}>
        {rightLabel}
      </Styled.ToggleLabel>
    </Styled.ToggleSection>
  );
};

