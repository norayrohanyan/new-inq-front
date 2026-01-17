'use client';

import Text from '@/components/Text';
import TariffsSection from './components/TariffsSection';
import JoinUsForm from './components/JoinUsForm';
import * as Styled from './styled';

export default function AboutPage() {
  return (
    <Styled.PageContainer>
      <Styled.ContentWrapper>
        <Styled.HeroSection>
          <Text type="h2" color="white" fontWeight="500">
            About Us
          </Text>
          <Text type="body" color="white" align="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sem leo, laoreet sed tincidunt id, dictum cursus mauris. Aliquam non faucibus dolor, quis ultricies dui. Suspendisse magna lacus, maximus ac elit at, sodales efficitur libero. Mauris a suscipit nisl. Vivamus a sapien a enim feugiat pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sem leo, laoreet sed tincidunt id, dictum cursus mauris. Aliquam non faucibus dolor, quis ultricies dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sem leo, laoreet sed tincidunt id, dictum cursus mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sem leo, laoreet sed tincidunt id, dictum cursus mauris. 
          </Text>
        </Styled.HeroSection>

        <TariffsSection />

        <JoinUsForm />
      </Styled.ContentWrapper>
    </Styled.PageContainer>
  );
}
