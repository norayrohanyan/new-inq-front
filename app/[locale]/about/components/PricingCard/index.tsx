'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import Button from '../../../../../components/Button';
import Text from '../../../../../components/Text';
import * as Styled from './styled';

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  price: string | number;
  currency?: string;
  features: PricingFeature[];
  buttonText: string;
  onButtonClick?: () => void;
  highlighted?: boolean;
  className?: string;
  index?: number;
}

export default function PricingCard({
  icon,
  title,
  subtitle,
  price,
  currency = '֏',
  features,
  buttonText,
  onButtonClick,
  highlighted = false,
  className,
  index = 0,
}: PricingCardProps) {
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as any,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20,
        delay: index * 0.1 + 0.2,
      },
    },
  };

  const featureVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1 + 0.3 + i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const priceVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
        delay: index * 0.1 + 0.5,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1 + 0.6,
        duration: 0.3,
      },
    },
  };

  return (
    <Styled.CardContainer
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' as any }
      }}
      $highlighted={highlighted}
      className={className}
    >
      <Styled.CardHeader>
        <Styled.CardSubHeader>
        <Styled.IconWrapper
          variants={iconVariants}
        >
          {icon}
        </Styled.IconWrapper>
        <Text type="h3" color="white" fontWeight="600">
          {title}
        </Text>
        </Styled.CardSubHeader>
        <Text type="small" color="secondaryLight">
          {subtitle}
        </Text>
      </Styled.CardHeader>

      <Styled.FeaturesList>
        {features.map((feature, i) => (
          <Styled.FeatureItem
            key={i}
            custom={i}
            variants={featureVariants}
            $included={feature.included}
          >
            <Styled.FeatureBullet>•</Styled.FeatureBullet>
            <Text type="body" color="white">
              {feature.text}
            </Text>
          </Styled.FeatureItem>
        ))}
      </Styled.FeaturesList>

      <Styled.PriceSection
        variants={priceVariants}
      >
        <Text type="h5" color="white" fontWeight='400'>
          {currency} {price}
        </Text>
      </Styled.PriceSection>

      <motion.div
        variants={buttonVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="primary"
          size="medium"
          fullWidth
          rounded
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </motion.div>
    </Styled.CardContainer>
  );
}
