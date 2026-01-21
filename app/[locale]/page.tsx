'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Text from '@/components/Text';
import AdBanner from '@/components/AdBanner';
import * as Styled from './styled';

export default function Home() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/${locale}/categories/${categorySlug}`);
  };

  const handleExploreCategoriesClick = () => {
    router.push(`/${locale}/categories`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <Styled.PageContainer>
      {/* Hero Banner Section */}
      <AdBanner pageName="home_page" height="300px" mobileHeight="250px" />

      {/* Discover Categories Section */}
      <Styled.DiscoverSection
        as={motion.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' as const }}
      >
        <Styled.DiscoverHeader>
          <div>
            <Styled.DiscoverTitle type="h2" color="white">
              Discover <Styled.HighlightText>different categories</Styled.HighlightText>
            </Styled.DiscoverTitle>
            <Styled.DiscoverSubtitle type="h2" color="white">
              to make your booking.
            </Styled.DiscoverSubtitle>
          </div>
        </Styled.DiscoverHeader>
        <Text type="body" color="secondarySemiLight">
          Find the service perfectly matching your booking requests fast and with ease using our list of partners and special algorithms.
        </Text>
      </Styled.DiscoverSection>

      {/* Category Cards Section */}
      <Styled.CategoriesGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Styled.CategoryCard
          variants={itemVariants}
          onClick={() => handleCategoryClick('beauty_salon')}
          $bgImage="/images/beauty.png"
        >
          <Styled.CategoryContent>
            <Text type="h4" color="white" fontWeight="600">
              {t('home.categories.beautySalon.title')}
            </Text>
            <Text type="caption" color="white">
              {t('home.categories.beautySalon.description')}
            </Text>
            <Styled.CardButton variant="primary" size="small" rounded>
              {t('home.categories.searchNearMe')} {/* //TODO: Add arrow right icon */}
            </Styled.CardButton>
          </Styled.CategoryContent>
        </Styled.CategoryCard>

        <Styled.CategoryCard
          variants={itemVariants}
          onClick={() => handleCategoryClick('apartments')}
          $bgImage="/images/apartment.png"
        >
          <Styled.CategoryContent>
            <Text type="h4" color="white" fontWeight="600">
              {t('home.categories.apartments.title')}
            </Text>
            <Text type="caption" color="white">
              {t('home.categories.apartments.description')}
            </Text>
            <Styled.CardButton variant="primary" size="small" rounded>
              {t('home.categories.searchNearMe')} {/* //TODO: Add arrow right icon */}
            </Styled.CardButton>
          </Styled.CategoryContent>
        </Styled.CategoryCard>

        <Styled.CategoryCard
          variants={itemVariants}
          onClick={() => handleCategoryClick('car_rental')}
          $bgImage="/images/2.png"
        >
          <Styled.CategoryContent>
            <Text type="h4" color="white" fontWeight="600">
              {t('home.categories.carRental.title')}
            </Text>
            <Text type="caption" color="white">
              {t('home.categories.carRental.description')}
            </Text>
            <Styled.CardButton variant="primary" size="small" rounded>
              {t('home.categories.searchNearMe')} {/* //TODO: Add arrow right icon */}
            </Styled.CardButton>
          </Styled.CategoryContent>
        </Styled.CategoryCard>

        <Styled.ExploreCard
          variants={itemVariants}
          onClick={handleExploreCategoriesClick}
        >
          <Styled.ExploreIcon>→</Styled.ExploreIcon>
          <Styled.ExploreContent>
            <Text type="h3" color="white" fontWeight="700">
              {t('home.categories.explore.title')}
            </Text>
            <Text type="caption" color="white">
              {t('home.categories.explore.description')}
            </Text>
          </Styled.ExploreContent>
        </Styled.ExploreCard>
      </Styled.CategoriesGrid>


    </Styled.PageContainer>
  );
}
