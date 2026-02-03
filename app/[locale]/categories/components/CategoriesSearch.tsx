import React from 'react';
import { useTranslations } from 'next-intl';
import * as Styled from '../styled';

interface ICategoriesSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const CategoriesSearch: React.FC<ICategoriesSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const t = useTranslations();

  return (
    <Styled.SearchWrapper>
      <Styled.SearchIcon>🔍</Styled.SearchIcon>
      <Styled.SearchInput
        type="text"
        placeholder={t('categories.search')}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Styled.SearchWrapper>
  );
};
