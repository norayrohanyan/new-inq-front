'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAdsThunk, adsSelectors } from '@/store';
import { ArrowIcon } from '@/components/icons/arrow';
import * as Styled from './styled';
import Text from '@/components/Text';
import { useIsMobile } from '@/hooks';

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
  const ads = useAppSelector(adsSelectors.getAdsByPage(pageName));
  const isLoading = useAppSelector(adsSelectors.getIsLoadingByPage(pageName));
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 because we'll add a clone at the beginning
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isMobile = useIsMobile();
  // Fetch ads on mount (only if not using mock data)
  useEffect(() => {
    dispatch(getAdsThunk(pageName));
  }, [dispatch, pageName]);

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
          <Text type={isMobile ? 'h4' : 'h1'} color="white">PLACE YOUR<br />AD HERE</Text>
          <Styled.SkeletonContainer>
            <Styled.SkeletonLine width="100%" />
            <Styled.SkeletonLine width="75%" />
            <Styled.SkeletonLine width="80%" />
            <Styled.SkeletonLine width="85%" />
          </Styled.SkeletonContainer>
          {!isMobile && <>
            <Styled.SkeletonCircle>
              <ArrowIcon width="40" height="40" fill="#FFFFFF99" />
            </Styled.SkeletonCircle>
          </>}
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
