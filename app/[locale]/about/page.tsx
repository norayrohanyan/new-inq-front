'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Text from '@/components/Text';
import TariffsSection from './components/TariffsSection';
import JoinUsForm from './components/JoinUsForm';
import * as Styled from './styled';

export default function AboutPage() {
  const joinUsFormRef = useRef<HTMLDivElement>(null);
  const [selectedTariff, setSelectedTariff] = useState<string>('');

  // Scroll to join us form if hash is present (from footer link)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#join-us') {
      setTimeout(() => {
        joinUsFormRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, []);

  const handleTariffSelect = useCallback((tariff: string) => {
    setSelectedTariff(tariff);
    
    // Scroll to join us form with smooth behavior
    setTimeout(() => {
      joinUsFormRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }, []);

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

        <TariffsSection onTariffSelect={handleTariffSelect} />

        <JoinUsForm ref={joinUsFormRef} selectedTariff={selectedTariff} />
      </Styled.ContentWrapper>
    </Styled.PageContainer>
  );
}
