'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FilterIcon } from '@/components/icons/filter';
import * as Styled from './styled';
import { useIsMobile, useResponsive } from '@/hooks';

interface FilterButtonProps {
  onClick: () => void;
  label?: string;
}

export default function FilterButton({ onClick, label }: FilterButtonProps) {
  const t = useTranslations();
  const isMobile = useResponsive(375);

  const labelText = label || (isMobile ? t('filters.filter') : t('filters.filterAndSort'));
  
  return (
    <Styled.FilterButtonContainer onClick={onClick}>
      <Styled.FilterIconWrapper>
        <FilterIcon width="12" height="12" />
      </Styled.FilterIconWrapper>
        {labelText}
    </Styled.FilterButtonContainer>
  );
}
