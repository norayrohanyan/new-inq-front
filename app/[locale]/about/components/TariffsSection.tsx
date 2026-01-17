'use client';

import { useMemo, useState } from 'react';
import PricingCard from '@/app/[locale]/about/components/PricingCard';
import TabButton from '@/app/[locale]/about/components/TabButton';
import Text from '@/components/Text';
import * as Styled from '../styled';
import { MonthIcon } from '@/components/icons/month';
import { BoxIcon } from '@/components/icons/box';

type TariffPlan = 'monthly' | '3months' | '6months' | '1year';

export default function TariffsSection() {
  const [activePlan, setActivePlan] = useState<TariffPlan>('1year');

  const _pricingData = {
    monthly: [
      {
        icon: <MonthIcon width="35" height="35" />,
        title: 'Monthly',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
        ],
      },
    ],
    '3months': [
      {
        icon: <MonthIcon width="35" height="35" />,
        title: 'Monthly',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
        ],
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: '3 Months',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
          { text: 'Bonus Social media ad', included: true },
          { text: 'Referral discount', included: true },
        ],
      },
    ],
    '6months': [
      {
        icon: <MonthIcon width="35" height="35" />,
        title: 'Monthly',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
        ],
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: '3 Months',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
          { text: 'Bonus Social media ad', included: true },
          { text: 'Referral discount', included: true },
        ],
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: '6 Months',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
          { text: 'Bonus Social media ad', included: true },
          { text: 'Referral discount', included: true },
        ],
      },
    ],
    '1year': [
      {
        icon: <MonthIcon width="35" height="35" />,
        title: 'Monthly',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
        ],
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: '3 Months',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
          { text: 'Bonus Social media ad', included: true },
          { text: 'Referral discount', included: true },
        ],
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: '6 Months',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
          { text: 'Bonus Social media ad', included: true },
          { text: 'Referral discount', included: true },
        ],
      },
      {
        icon: <BoxIcon width="35" height="35" />,
        title: '1 Year',
        subtitle: 'Pay monthly',
        price: 40000,
        features: [
          { text: 'Portfolio', included: true },
          { text: 'Booking history duration', included: true },
          { text: 'Analytics', included: true },
          { text: 'Employee count', included: true },
          { text: 'Bonus Social media ad', included: true },
          { text: 'Referral discount', included: true },
        ],
      },
    ],
  };

  const pricingData = useMemo(() => {
    return _pricingData;
  }, [_pricingData])

  return (
    <Styled.TariffsSection>
      <Text type="h2" color="white" align="start" fontWeight="500">
        Tariffs
      </Text>

      <Styled.TabsContainer>
        <TabButton
          label="Monthly"
          active={activePlan === 'monthly'}
          onClick={() => setActivePlan('monthly')}
        />
        <TabButton
          label="3 Moths"
          active={activePlan === '3months'}
          onClick={() => setActivePlan('3months')}
        />
        <TabButton
          label="6 Moths"
          active={activePlan === '6months'}
          onClick={() => setActivePlan('6months')}
        />
        <TabButton
          label="1 Year"
          active={activePlan === '1year'}
          onClick={() => setActivePlan('1year')}
        />
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
            buttonText="Try for 14 days"
            highlighted={activePlan === '3months' && index === 1}
            onButtonClick={() => console.log(`Selected: ${card.title}`)}
          />
        ))}
      </Styled.PricingCardsGrid>
    </Styled.TariffsSection>
  );
}
