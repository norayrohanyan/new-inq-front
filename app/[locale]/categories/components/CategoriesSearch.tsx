import React from 'react';
import { useTranslations } from 'next-intl';
import * as Styled from '../styled';
import { FilterIcon } from '@/components/icons/filter';


interface ICategoriesSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

export const CategoriesSearch: React.FC<ICategoriesSearchProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
}) => {
  const t = useTranslations();

  return (
    <>
      <Styled.SearchWrapper>
        <Styled.SearchIcon>🔍</Styled.SearchIcon>
        <Styled.SearchInput
          type="text"
          placeholder={t('categories.search')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Styled.SearchWrapper>
      <Styled.FilterButton onClick={onFilterClick}>
        <Styled.FilterIconWrapper>
          <FilterIcon width="12" height="12" />
        </Styled.FilterIconWrapper>
        {t('categories.filterAndSort')}
      </Styled.FilterButton>
    </>
  );
};

