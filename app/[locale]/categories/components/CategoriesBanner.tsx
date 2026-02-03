import React from 'react';
import AdBanner from '@/components/AdBanner';
import * as Styled from '../styled';

export const CategoriesBanner: React.FC = () => {
  return (
    <Styled.BannerSection>
      <AdBanner pageName="categories_page" height="300px" mobileHeight="200px" />
    </Styled.BannerSection>
  );
};

