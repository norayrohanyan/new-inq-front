'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { categoriesSelectors, getCategoriesThunk } from '@/store';
import PageLoader from '@/components/PageLoader';
import * as Styled from './styled';

export default function CategoriesPage() {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesSelectors.categories);
  const isLoading = useAppSelector(categoriesSelectors.isLoading);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !isLoading) {
      // Redirect to first category
      router.replace(`/${locale}/categories/${categories[0].slug}`);
    }
  }, [categories, isLoading, locale, router]);

  return (
    <Styled.PageContainer>
      <PageLoader/>
    </Styled.PageContainer>
  );
}

