'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { categoriesSelectors, getCategoriesThunk } from '@/store';
import Text from '@/components/Text';
import * as Styled from './styled';

export default function CategoriesPage() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesSelectors.categories);
  const isLoading = useAppSelector(categoriesSelectors.isLoading);
  const error = useAppSelector(categoriesSelectors.error);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].slug);
    }
  }, [categories, selectedCategory]);

  if (isLoading) {
    return (
      <Styled.PageContainer>
        <Styled.LoadingContainer>
          <div className="spinner" />
          <Text type="body" color="white">
            {t('categories.loadingCategories')}
          </Text>
        </Styled.LoadingContainer>
      </Styled.PageContainer>
    );
  }

  if (error) {
    return (
      <Styled.PageContainer>
        <Styled.ErrorContainer>
          <Text type="h2" color="accentRed">
            {t('common.error')}
          </Text>
          <Text type="body" color="white">
            {error}
          </Text>
          <button onClick={() => dispatch(getCategoriesThunk())}>
            {t('common.tryAgain')}
          </button>
        </Styled.ErrorContainer>
      </Styled.PageContainer>
    );
  }

  if (categories.length === 0) {
    return (
      <Styled.PageContainer>
        <Styled.EmptyState>
          <Text type="h2" color="white">
            {t('categories.noCategories')}
          </Text>
          <Text type="body" customColor="rgba(255, 255, 255, 0.7)">
            {t('categories.noCategoriesDescription')}
          </Text>
        </Styled.EmptyState>
      </Styled.PageContainer>
    );
  }

  return (
    <Styled.PageContainer>
      <Styled.ContentSection>
        <Styled.BannerContent>
          <Text type="h1" color="white" align="center">
            {t('categories.title')}
          </Text>
        </Styled.BannerContent>
        <Styled.CategoriesChips>
          {categories.map((category) => (
            <Styled.CategoryChip
              key={category.slug}
              $active={selectedCategory === category.slug}
              onClick={() => setSelectedCategory(category.slug)}
            >
              <Text
                type="body"
                color="white"
                fontWeight={selectedCategory === category.slug ? '600' : '500'}
              >
                {category.name.toUpperCase()}
              </Text>
            </Styled.CategoryChip>
          ))}
        </Styled.CategoriesChips>
      </Styled.ContentSection>
    </Styled.PageContainer>
  );
}

