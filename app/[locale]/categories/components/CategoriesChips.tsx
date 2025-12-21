import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { categoriesSelectors, getCategoriesThunk } from '@/store';
import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import * as Styled from '../styled';

interface ICategoriesChipsProps {
  selectedCategory: string | null;
  onCategoryChange: (slug: string) => void;
}

export const CategoriesChips: React.FC<ICategoriesChipsProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const categories = useAppSelector(categoriesSelectors.categories);
  const isLoading = useAppSelector(categoriesSelectors.isLoading);

  // Load categories on mount
  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Styled.CategoriesSection>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Text type="body" color="white">
            {t('common.loading')}
          </Text>
        </div>
      </Styled.CategoriesSection>
    );
  }

  if (categories.length === 0) {
    return (
      <Styled.CategoriesSection>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Text type="body" color="white">
            {t('categories.noCategories')}
          </Text>
        </div>
      </Styled.CategoriesSection>
    );
  }

  return (
    <Styled.CategoriesSection>
      <Styled.CategoriesGrid>
        {categories.map((category) => (
          <Styled.CategoryChip
            key={category.slug}
            $active={selectedCategory === category.slug}
            onClick={() => onCategoryChange(category.slug)}
          >
            {category.name.toUpperCase()}
          </Styled.CategoryChip>
        ))}
      </Styled.CategoriesGrid>
    </Styled.CategoriesSection>
  );
};

