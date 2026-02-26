'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
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

  const t = useTranslations();

  return (
    <Styled.PageContainer>
      <Styled.ContentWrapper>
        <Styled.HeroSection>
          <Text type="h2" color="white" fontWeight="500">
            {t('about.title')}
          </Text>
          <Text type="body" color="white" align="justify">
            {t('about.description')}
          </Text>
        </Styled.HeroSection>

        <TariffsSection onTariffSelect={handleTariffSelect} />

        <JoinUsForm ref={joinUsFormRef} selectedTariff={selectedTariff} />
      </Styled.ContentWrapper>
    </Styled.PageContainer>
  );
}
