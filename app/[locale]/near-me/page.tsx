'use client';

import { useState, useCallback, useEffect } from 'react';
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
  const selectedLocation = useAppSelector(nearMeSelectors.selectedLocation);
  const radius = useAppSelector(nearMeSelectors.radius);
  const locationPermission = useAppSelector(nearMeSelectors.locationPermission);

  const activeLocation = selectedLocation ?? userLocation;
  
  // Local state
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Fetch companies when category, location, or radius changes
  useEffect(() => {
    const params: { category: string; latitude?: number; longitude?: number; radius?: number } = {
      category: selectedCategory,
    };

    if (activeLocation && isFinite(radius)) {
      params.latitude = activeLocation.latitude;
      params.longitude = activeLocation.longitude;
      params.radius = radius;
    }

    dispatch(getCompaniesNearMeThunk(params));
  }, [dispatch, selectedCategory, activeLocation, radius]);

  // Automatically get user location on mount
  useEffect(() => {
    handleGetLocation();
  }, []);

  // Handlers
  const handleCategoryChange = useCallback((slug: string) => {
    dispatch(nearMeActions.setSelectedCategory(slug));
  }, [dispatch]);

  const handleRadiusChange = useCallback((newRadius: number) => {
    dispatch(nearMeActions.setRadius(newRadius));
  }, [dispatch]);

  const handleMapClick = useCallback((location: { latitude: number; longitude: number }) => {
    dispatch(nearMeActions.setSelectedLocation(location));
    dispatch(nearMeActions.setLocationPermission('granted'));
  }, [dispatch]);

  const handleLocate = useCallback((location: { latitude: number; longitude: number }) => {
    const isSame =
      userLocation &&
      Math.abs(userLocation.latitude - location.latitude) < 0.0001 &&
      Math.abs(userLocation.longitude - location.longitude) < 0.0001;

    if (isSame && !selectedLocation) return;

    dispatch(nearMeActions.setUserLocation(location));
    dispatch(nearMeActions.setSelectedLocation(null));
    dispatch(nearMeActions.setLocationPermission('granted'));
  }, [dispatch, userLocation, selectedLocation]);

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
        dispatch(nearMeActions.setSelectedLocation(null));
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

    if (activeLocation && isFinite(radius)) {
      params.latitude = activeLocation.latitude;
      params.longitude = activeLocation.longitude;
      params.radius = radius;
    }

    dispatch(getCompaniesNearMeThunk(params));
  }, [dispatch, selectedCategory, activeLocation, radius]);

  return (
    <Styled.PageContainer>
      <CategoriesChips
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <NearMeControls
        radius={radius}
        onRadiusChange={handleRadiusChange}
        onPlaceSelect={handleMapClick}
      />

      {companies.length > 0 && (
        <Styled.ResultsInfo>
          Found <Styled.ResultsCount>{companies.length}</Styled.ResultsCount> places
          {activeLocation && isFinite(radius) && ` within ${radius / 1000}km`}
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
              companies={companies}
              activeLocation={activeLocation}
              radius={radius}
              isLoading={isLoading}
              onMapClick={handleMapClick}
              onLocate={handleLocate}
            />
          )}
        </Styled.MapContainer>
      </Styled.MapSection>
    </Styled.PageContainer>
  );
}
