import React from 'react';
import Text from '@/components/Text';
import * as Styled from '../styled';

export const CategoriesBanner: React.FC = () => {
  return (
    <Styled.BannerSection>
      <Styled.Banner>
        <Text type="h1" color="white" fontWeight="700">
          PLACE YOUR AD HERE
        </Text>
      </Styled.Banner>
    </Styled.BannerSection>
  );
};

