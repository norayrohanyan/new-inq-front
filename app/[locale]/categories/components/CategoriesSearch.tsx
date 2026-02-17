import React from 'react';
import { useTranslations } from 'next-intl';
import SearchInput from '@/components/SearchInput';

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
    <SearchInput
      type="text"
      placeholder={t('categories.search')}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};
