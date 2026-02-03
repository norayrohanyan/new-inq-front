'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { CloseIcon } from '@/components/icons/close';
import { useEventListener } from '@/hooks';

import * as Styled from './styled';

export interface FilterChip {
  key: string;
  value: string;
  label: string;
}

interface FilterChipsProps {
  activeFilters: FilterChip[];
  onRemoveFilter: (key: string, value: string) => void;
  onClearAll: () => void;
}

export default function FilterChips({
  activeFilters,
  onRemoveFilter,
  onClearAll,
}: FilterChipsProps) {
  const t = useTranslations();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  const checkOverflow = useCallback(() => {
    if (wrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
      const isOverflowing = scrollWidth > clientWidth;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

      setShowFade(isOverflowing && !isAtEnd);
    }
  }, []);

  useEffect(() => {
    checkOverflow();
  }, [activeFilters, checkOverflow]);

  useEventListener('resize', checkOverflow);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <Styled.ChipsContainer>
      <Styled.ChipsWrapperContainer ref={containerRef} className={showFade ? 'has-overflow' : ''}>
        <Styled.ChipsWrapper ref={wrapperRef} onScroll={checkOverflow}>
          {activeFilters.map((filter, index) => (
            <Styled.Chip key={`${filter.key}-${filter.value}-${index}`}>
              <Styled.ChipLabel>{filter.label}</Styled.ChipLabel>
              <CloseIcon onClick={() => onRemoveFilter(filter.key, filter.value)} width="16" height="16"/>
            </Styled.Chip>
          ))}
        </Styled.ChipsWrapper>
      </Styled.ChipsWrapperContainer>
      <Styled.ClearAllChip onClick={onClearAll}>
        <Styled.ChipLabel>{t('filters.clearAll')}</Styled.ChipLabel>
        <CloseIcon onClick={onClearAll} width="16" height="16"/>
      </Styled.ClearAllChip>
    </Styled.ChipsContainer>
  );
}
