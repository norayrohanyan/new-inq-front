'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAdsThunk, adsSelectors } from '@/store';
import { IAd } from '@/store/types/ads';
import { ArrowIcon } from '@/components/icons/arrow';
import * as Styled from './styled';

// Mock data for testing - Remove this when real API is ready
const MOCK_ADS: Record<string, IAd[]> = {
  home_page: [
    {
      id: 1,
      company_id: 101,
      category: 'beauty_salon',
      url: 'https://example.com/beauty-salon',
      desktop_image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=300&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=250&fit=crop',
    },
    {
      id: 2,
      company_id: 102,
      category: 'car_rental',
      url: 'https://example.com/car-rental',
      desktop_image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=300&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=250&fit=crop',
    },
    {
      id: 3,
      company_id: 103,
      category: 'apartments',
      url: 'https://example.com/apartments',
      desktop_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=300&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=250&fit=crop',
    },{
      id: 4,
      company_id: 103,
      category: 'apartments',
      url: 'https://example.com/apartments',
      desktop_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=300&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=250&fit=crop',
    },{
      id: 5,
      company_id: 103,
      category: 'apartments',
      url: 'https://example.com/apartments',
      desktop_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=300&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=250&fit=crop',
    },{
      id: 6,
      company_id: 103,
      category: 'apartments',
      url: 'https://example.com/apartments',
      desktop_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=300&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=250&fit=crop',
    },{
      id: 7,
      company_id: 103,
      category: 'apartments',
      url: 'https://example.com/apartments',
      desktop_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=300&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=250&fit=crop',
    },
    
  ],
  categories_page: [

  ],
  company_page: [
    {
      id: 5,
      company_id: 105,
      category: 'car_rental',
      url: 'https://example.com/featured-company',
      desktop_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=200&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=150&fit=crop',
    },
  ],
  detail_page: [
    {
      id: 6,
      company_id: 106,
      category: 'beauty_salon',
      url: 'https://example.com/book-now',
      desktop_image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=1200&h=300&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&h=200&fit=crop',
    },
    {
      id: 7,
      company_id: 107,
      category: 'beauty_salon',
      url: 'https://example.com/new-service',
      desktop_image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&h=300&fit=crop',
      mobile_image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=200&fit=crop',
    },
  ],
};

const USE_MOCK_DATA = true; // Set to false when real API is ready

interface AdBannerProps {
  pageName: string;
  height?: string;
  mobileHeight?: string;
  autoScrollInterval?: number; // in milliseconds, default 5000 (5 seconds)
}

export const AdBanner: React.FC<AdBannerProps> = ({
  pageName,
  height = '300px',
  mobileHeight = '250px',
  autoScrollInterval = 5000,
}) => {
  const dispatch = useAppDispatch();
  const adsFromStore = useAppSelector(adsSelectors.getAdsByPage(pageName));
  const isLoading = useAppSelector(adsSelectors.getIsLoadingByPage(pageName));
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 because we'll add a clone at the beginning
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use mock data or real data from store
  const ads = USE_MOCK_DATA ? (MOCK_ADS[pageName] || []) : adsFromStore;

  // Fetch ads on mount (only if not using mock data)
  useEffect(() => {
    if (!USE_MOCK_DATA) {
      dispatch(getAdsThunk(pageName));
    }
  }, [dispatch, pageName]);

  // Detect mobile TODO add mobile hook
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index + 1); // +1 because of the cloned first slide
  }, []);

  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  // Handle infinite loop by jumping to the real slide after transition
  useEffect(() => {
    if (ads.length <= 1) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      // If we're at the cloned last slide (index = ads.length + 1), jump to the real first slide (index = 1)
      if (currentIndex === ads.length + 1) {
        setCurrentIndex(1);
      }

      // If we're at the cloned first slide (index = 0), jump to the real last slide (index = ads.length)
      if (currentIndex === 0) {
        setCurrentIndex(ads.length);
      }
    };

    const timer = setTimeout(handleTransitionEnd, 500); // Match the transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, ads.length]);

  // Auto-scroll functionality (pauses on hover)
  useEffect(() => {
    if (ads.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [ads.length, autoScrollInterval, isHovered, handleNext]);

  if (isLoading) {
    return (
      <Styled.BannerContainer height={height} mobileHeight={mobileHeight}>
        <Styled.LoadingPlaceholder>
          <Styled.Spinner />
        </Styled.LoadingPlaceholder>
      </Styled.BannerContainer>
    );
  }

  if (!ads || ads.length === 0) {
    return (
      <Styled.BannerContainer height={height} mobileHeight={mobileHeight}>
        <Styled.PlaceholderContent>
          <Styled.PlaceholderText>PLACE YOUR<br />AD HERE</Styled.PlaceholderText>
          <Styled.SkeletonContainer>
            <Styled.SkeletonLine width="100%" />
            <Styled.SkeletonLine width="75%" />
            <Styled.SkeletonLine width="80%" />
            <Styled.SkeletonLine width="85%" />
          </Styled.SkeletonContainer>
          <Styled.SkeletonCircle>
            <ArrowIcon width="40" height="40" fill="#FFFFFF99" />
          </Styled.SkeletonCircle>
        </Styled.PlaceholderContent>
      </Styled.BannerContainer>
    );
  }

  // Create slides array with clones for infinite effect
  const slides = ads.length > 1
    ? [ads[ads.length - 1], ...ads, ads[0]] // Clone last slide at start, first slide at end
    : ads;

  // Calculate the actual index for dot indicator (0-based, excluding clones)
  const actualIndex = currentIndex - 1;

  return (
    <Styled.BannerContainer
      height={height}
      mobileHeight={mobileHeight}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Styled.SliderWrapper>
        {/* Slider Track with all ads */}
        <Styled.SliderTrack
          $currentIndex={currentIndex}
          $totalAds={slides.length}
          $isTransitioning={isTransitioning}
        >
          {slides.map((ad, index) => {
            const imageUrl = isMobile ? ad.mobile_image : ad.desktop_image;
            return (
              <Styled.SlideItem key={`${ad.id}-${index}`} $totalAds={slides.length}>
                <Styled.AdImage
                  src={imageUrl}
                  alt={`Advertisement ${index + 1}`}
                  onClick={() => {
                    if (ad.url) {
                      window.open(ad.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  $clickable={!!ad.url}
                />
              </Styled.SlideItem>
            );
          })}
        </Styled.SliderTrack>

        {/* Navigation Arrows - only show if multiple ads */}
        {ads.length > 1 && (
          <>
            <Styled.NavButton $position="left" onClick={handlePrevious}>
              <ArrowIcon width="24" height="22" rotate={true} />
            </Styled.NavButton>
            <Styled.NavButton $position="right" onClick={handleNext}>
              <ArrowIcon width="24" height="22" />
            </Styled.NavButton>
          </>
        )}

        {/* Dots Indicator - only show if multiple ads */}
        {ads.length > 1 && (
          <Styled.DotsContainer>
            {ads.map((_, index) => (
              <Styled.Dot
                key={index}
                $active={index === actualIndex}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </Styled.DotsContainer>
        )}
      </Styled.SliderWrapper>
    </Styled.BannerContainer>
  );
};

export default AdBanner;
