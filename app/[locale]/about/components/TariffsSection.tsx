'use client';

import { useMemo, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

import Text from '@/components/Text';
import * as Styled from '../styled';
import { MonthIcon } from '@/components/icons/month';
import { BoxIcon } from '@/components/icons/box';
import TabButton from '@/app/[locale]/about/components/TabButton';
import PricingCard from '@/app/[locale]/about/components/PricingCard';
import { useIsMobile } from '@/hooks';

type TariffPlan = 'monthly' | '3months' | '6months' | '1year';

interface TariffsSectionProps {
  onTariffSelect?: (tariff: string) => void;
}

export default function TariffsSection({ onTariffSelect }: TariffsSectionProps) {
  const [activePlan, setActivePlan] = useState<TariffPlan>('1year');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isMobile = useIsMobile();
  const t = useTranslations();

  const baseFeatures = [
    { text: t('tariffs.portfolio'), included: true },
    { text: t('tariffs.bookingHistoryDuration'), included: true },
    { text: t('tariffs.analytics'), included: true },
    { text: t('tariffs.employeeCount'), included: true },
  ];

  const extendedFeatures = [
    ...baseFeatures,
    { text: t('tariffs.bonusSocialMediaAd'), included: true },
    { text: t('tariffs.referralDiscount'), included: true },
  ];

  const _pricingData = {
    monthly: [
      {
        icon: <MonthIcon width="35" height="35" />,
        title: t('tariffs.monthly'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: baseFeatures,
      },
    ],
    '3months': [
      {
        icon: <MonthIcon width="35" height="35" />,
        title: t('tariffs.monthly'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: baseFeatures,
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: t('tariffs.threeMonths'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: extendedFeatures,
      },
    ],
    '6months': [
      {
        icon: <MonthIcon width="35" height="35" />,
        title: t('tariffs.monthly'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: baseFeatures,
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: t('tariffs.threeMonths'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: extendedFeatures,
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: t('tariffs.sixMonths'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: extendedFeatures,
      },
    ],
    '1year': [
      {
        icon: <MonthIcon width="35" height="35" />,
        title: t('tariffs.monthly'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: baseFeatures,
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: t('tariffs.threeMonths'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: extendedFeatures,
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: t('tariffs.sixMonths'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: extendedFeatures,
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: t('tariffs.oneYear'),
        subtitle: t('tariffs.payMonthly'),
        price: 40000,
        features: extendedFeatures,
      },
    ],
  };

  const pricingData = useMemo(() => {
    return _pricingData;
  }, [_pricingData])

  const handleTabClick = (plan: TariffPlan) => {
    setActivePlan(plan);

    if (!isMobile) {
      return;
    }

    // Scroll the selected tab into view
    const tabElement = tabRefs.current[plan];
    const container = tabsContainerRef.current;

    if (tabElement && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = tabElement.getBoundingClientRect();

      const scrollLeft = container.scrollLeft;
      const tabLeft = tabRect.left - containerRect.left + scrollLeft;
      const tabCenter = tabLeft + tabRect.width / 2;
      const containerCenter = container.offsetWidth / 2;

      container.scrollTo({
        left: tabCenter - containerCenter,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Styled.TariffsSection>
      <Text type="h2" color="white" align="start" fontWeight="500">
        {t('tariffs.title')}
      </Text>

      <Styled.TabsContainer ref={tabsContainerRef}>
        <div ref={(el) => { tabRefs.current['monthly'] = el; }}>
          <TabButton
            label={t('tariffs.monthly')}
            active={activePlan === 'monthly'}
            onClick={() => handleTabClick('monthly')}
          />
        </div>
        <div ref={(el) => { tabRefs.current['3months'] = el; }}>
          <TabButton
            label={t('tariffs.threeMonths')}
            active={activePlan === '3months'}
            onClick={() => handleTabClick('3months')}
          />
        </div>
        <div ref={(el) => { tabRefs.current['6months'] = el; }}>
          <TabButton
            label={t('tariffs.sixMonths')}
            active={activePlan === '6months'}
            onClick={() => handleTabClick('6months')}
          />
        </div>
        <div ref={(el) => { tabRefs.current['1year'] = el; }}>
          <TabButton
            label={t('tariffs.oneYear')}
            active={activePlan === '1year'}
            onClick={() => handleTabClick('1year')}
          />
        </div>
      </Styled.TabsContainer>

      <Styled.PricingCardsGrid>
        {pricingData[activePlan].map((card, index) => (
          <PricingCard
            key={index}
            index={index}
            icon={card.icon}
            title={card.title}
            subtitle={card.subtitle}
            price={card.price}
            features={card.features}
            buttonText={t('tariffs.tryForDays')}
            highlighted={activePlan === '3months' && index === 1}
            onButtonClick={() => onTariffSelect?.(card.title)}
          />
        ))}
      </Styled.PricingCardsGrid>
    </Styled.TariffsSection>
  );
}
