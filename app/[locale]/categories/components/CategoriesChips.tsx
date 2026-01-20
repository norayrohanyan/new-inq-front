import React, { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { categoriesSelectors, getCategoriesThunk } from '@/store';
import { useTranslations } from 'next-intl';
import { useIsMobile } from '@/hooks/useIsMobile';
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
  const isMobile = useIsMobile();
  const chipRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const lastScrolledCategory = useRef<string | null>(null);
  const isUserClick = useRef(false);

  const categories = useAppSelector(categoriesSelectors.categories);
  const isLoading = useAppSelector(categoriesSelectors.isLoading);

  // Load categories only if not already loaded
  useEffect(() => {
    if (categories.length === 0) {
    dispatch(getCategoriesThunk());
    }
  }, [dispatch, categories.length]);

  // Scroll to selected category chip (only on mobile)
  const scrollToChip = useCallback((slug: string) => {
    if (!isMobile) return;
    
    const chip = chipRefs.current.get(slug);
    if (chip) {
      chip.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [isMobile]);

  // Scroll to selected chip only on initial page load (not on user clicks)
  useEffect(() => {
    if (!selectedCategory || !isMobile || categories.length === 0) return;
    
    // Skip if this was triggered by a user click (they already scrolled)
    if (isUserClick.current) {
      isUserClick.current = false;
      lastScrolledCategory.current = selectedCategory;
      return;
    }
    
    // Skip if we already scrolled to this category
    if (lastScrolledCategory.current === selectedCategory) return;
    
    // Scroll on initial load or direct URL navigation
    const timer = setTimeout(() => {
      scrollToChip(selectedCategory);
      lastScrolledCategory.current = selectedCategory;
    }, 100);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, scrollToChip, categories.length, isMobile]);

  const handleCategoryClick = (slug: string) => {
    // Mark as user click to prevent double scroll
    isUserClick.current = true;
    lastScrolledCategory.current = slug;
    
    // Scroll immediately on click
    scrollToChip(slug);
    
    // Then change the category (which changes URL)
    onCategoryChange(slug);
  };

  const setChipRef = (slug: string) => (el: HTMLButtonElement | null) => {
    if (el) {
      chipRefs.current.set(slug, el);
    } else {
      chipRefs.current.delete(slug);
    }
  };

  // Only show loading on first load (when we have no categories yet)
  if (isLoading && categories.length === 0) {
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
      <Styled.CategoriesGridWrapper>
      <Styled.CategoriesGrid>
        {categories.map((category) => (
          <Styled.CategoryChip
            key={category.slug}
              ref={setChipRef(category.slug)}
            $active={selectedCategory === category.slug}
              onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name.toUpperCase()}
          </Styled.CategoryChip>
        ))}
      </Styled.CategoriesGrid>
      </Styled.CategoriesGridWrapper>
    </Styled.CategoriesSection>
  );
};
