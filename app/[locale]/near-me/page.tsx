'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  nearMeSelectors,
  nearMeActions,
  getCompaniesNearMeThunk,
} from '@/store';
import { NearMeControls } from './components';
import { CategoriesChips } from '@/components/CategoriesChips';
import * as Styled from './styled';

// Dynamic import for Map component (Leaflet needs client-side only)
const NearMeMap = dynamic(
  () => import('./components/NearMeMap').then((mod) => ({ default: mod.NearMeMap })),
  { 
    ssr: false,
    loading: () => (
      <Styled.LoadingContainer>
        <div className="spinner" />
        <Styled.LoadingText>Loading map...</Styled.LoadingText>
      </Styled.LoadingContainer>
    ),
  }
);

export default function NearMePage() {
  const dispatch = useAppDispatch();
  
  // Redux state
  const companies = useAppSelector(nearMeSelectors.companies);
  const isLoading = useAppSelector(nearMeSelectors.isLoading);
  const error = useAppSelector(nearMeSelectors.error);
  const selectedCategory = useAppSelector(nearMeSelectors.selectedCategory);
  const userLocation = useAppSelector(nearMeSelectors.userLocation);
  const radius = useAppSelector(nearMeSelectors.radius);
  const locationPermission = useAppSelector(nearMeSelectors.locationPermission);
  
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Filter companies by search term
  const filteredCompanies = useMemo(() => {
    if (!searchTerm.trim()) return companies;
    const term = searchTerm.toLowerCase();
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(term) ||
        company.address.toLowerCase().includes(term)
    );
  }, [companies, searchTerm]);

  // Fetch companies when category, location, or radius changes
  useEffect(() => {
    const params: { category: string; latitude?: number; longitude?: number; radius?: number } = {
      category: selectedCategory,
    };

    // Temporarily disabled location filtering to show all companies
    if (userLocation) {
      params.latitude = userLocation.latitude;
      params.longitude = userLocation.longitude;
      params.radius = radius;
    }

    console.log('🔍 Fetching companies with params:', params);
    dispatch(getCompaniesNearMeThunk(params));
  }, [dispatch, selectedCategory, userLocation, radius]);

  // Automatically get user location on mount
  useEffect(() => {
    handleGetLocation();
  }, []);

  // Handlers
  const handleCategoryChange = useCallback((slug: string) => {
    dispatch(nearMeActions.setSelectedCategory(slug));
    setSearchTerm('');
  }, [dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleRadiusChange = useCallback((newRadius: number) => {
    dispatch(nearMeActions.setRadius(newRadius));
  }, [dispatch]);

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(nearMeActions.setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        dispatch(nearMeActions.setLocationPermission('granted'));
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        dispatch(nearMeActions.setLocationPermission('denied'));
        setIsLoadingLocation(false);
        
        let message = 'Unable to get your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location permission was denied. Please enable it in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out.';
            break;
        }
        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    const params: { category: string; latitude?: number; longitude?: number; radius?: number } = {
      category: selectedCategory,
    };

    if (userLocation) {
      params.latitude = userLocation.latitude;
      params.longitude = userLocation.longitude;
      params.radius = radius;
    }

    dispatch(getCompaniesNearMeThunk(params));
  }, [dispatch, selectedCategory, userLocation, radius]);

  return (
    <Styled.PageContainer>
      <CategoriesChips
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <NearMeControls
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        radius={radius}
        onRadiusChange={handleRadiusChange}
      />

      {filteredCompanies.length > 0 && (
        <Styled.ResultsInfo>
          Found <Styled.ResultsCount>{filteredCompanies.length}</Styled.ResultsCount> places
          {userLocation && ` within ${radius / 1000}km`}
        </Styled.ResultsInfo>
      )}

      <Styled.MapSection>
        <Styled.MapContainer>
          {error ? (
            <Styled.ErrorContainer>
              <Styled.ErrorIcon>⚠️</Styled.ErrorIcon>
              <Styled.ErrorText>{error}</Styled.ErrorText>
              <Styled.RetryButton onClick={handleRetry}>
                Try Again
              </Styled.RetryButton>
            </Styled.ErrorContainer>
          ) : !userLocation && locationPermission !== 'granted' ? (
            <Styled.MapOverlay>
              <Styled.MapOverlayIcon>📍</Styled.MapOverlayIcon>
              <Styled.MapOverlayText>
                Enable location access to find places near you
              </Styled.MapOverlayText>
              <Styled.MapOverlayButton onClick={handleGetLocation}>
                {isLoadingLocation ? 'Getting location...' : 'Enable Location'}
              </Styled.MapOverlayButton>
            </Styled.MapOverlay>
          ) : (
            <NearMeMap
              companies={filteredCompanies}
              userLocation={userLocation}
              radius={radius}
              isLoading={isLoading}
            />
          )}
        </Styled.MapContainer>
      </Styled.MapSection>
    </Styled.PageContainer>
  );
}
