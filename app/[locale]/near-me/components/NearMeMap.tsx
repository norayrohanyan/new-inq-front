'use client';

import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { INearMeCompany } from '@/store/types/nearMe';
import { LocationIcon, StarIcon, ClockIcon } from '@/components/icons';
import * as Styled from '../styled';

// Fix for default markers not showing
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const createCustomIcon = (isOpen?: boolean) => {
  const color = isOpen === undefined ? '#FE7F3B' : isOpen ? '#4CAF50' : '#FF5C5C';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

// User location marker
const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #3866FF;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(56, 102, 255, 0.5);
      animation: pulse 2s ease-in-out infinite;
    "></div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Component to update map center
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
}

interface INearMeMapProps {
  companies: INearMeCompany[];
  userLocation: { latitude: number; longitude: number } | null;
  radius: number;
  isLoading: boolean;
}

export const NearMeMap: React.FC<INearMeMapProps> = ({
  companies,
  userLocation,
  radius,
  isLoading,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const mapRef = useRef<L.Map | null>(null);

  // Default center (Yerevan, Armenia)
  const defaultCenter: [number, number] = [40.1792, 44.4991];
  
  const center = useMemo<[number, number]>(() => {
    if (userLocation) {
      return [userLocation.latitude, userLocation.longitude];
    }
    // If we have companies, center on first one
    if (companies.length > 0) {
      return [companies[0].latitude, companies[0].longitude];
    }
    return defaultCenter;
  }, [userLocation, companies]);

  const handleViewDetails = (company: INearMeCompany) => {
    router.push(`/${locale}/categories/${company.category}/company/${company.id}`);
  };

  const formatDistance = (meters?: number) => {
    if (!meters) return null;
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  if (isLoading) {
    return (
      <Styled.LoadingContainer>
        <div className="spinner" />
        <Styled.LoadingText>Loading nearby places...</Styled.LoadingText>
      </Styled.LoadingContainer>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater center={center} zoom={13} />

      {/* User location marker */}
      {userLocation && (
        <>
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userLocationIcon}
          >
            <Popup>
              <div style={{ textAlign: 'center', padding: '0.5rem' }}>
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
          
          {/* Radius circle */}
          <Circle
            center={[userLocation.latitude, userLocation.longitude]}
            radius={radius}
            pathOptions={{
              color: '#FE7F3B',
              fillColor: '#FE7F3B',
              fillOpacity: 0.1,
              weight: 2,
            }}
          />
        </>
      )}

      {/* Company markers */}
      {companies.map((company) => (
        <Marker
          key={company.id}
          position={[company.latitude, company.longitude]}
          icon={createCustomIcon(company.is_open)}
        >
          <Popup>
            <Styled.PopupContainer>
              {(company.logo || company.image_url) && (
                <Styled.PopupImage $src={company.logo || company.image_url || ''} />
              )}
              <Styled.PopupTitle>{company.name}</Styled.PopupTitle>
              <Styled.PopupInfo>
                <Styled.PopupInfoRow>
                  <LocationIcon width="14" height="14" />
                  <span>{company.address}</span>
                </Styled.PopupInfoRow>
                
                {company.is_open !== undefined && (
                  <Styled.PopupInfoRow>
                    <ClockIcon width="14" height="14" />
                    <Styled.PopupStatus $isOpen={company.is_open}>
                      {company.is_open ? 'Open Now' : 'Closed'}
                    </Styled.PopupStatus>
                  </Styled.PopupInfoRow>
                )}
                
                {company.rating && (
                  <Styled.PopupInfoRow>
                    <StarIcon width="14" height="14" />
                    <Styled.PopupRating>
                      {typeof company.rating === 'number' 
                        ? company.rating.toFixed(1) 
                        : company.rating}
                    </Styled.PopupRating>
                  </Styled.PopupInfoRow>
                )}
                
                {company.distance && (
                  <Styled.PopupInfoRow>
                    <Styled.PopupDistance>
                      📍 {formatDistance(company.distance)} away
                    </Styled.PopupDistance>
                  </Styled.PopupInfoRow>
                )}
              </Styled.PopupInfo>
              
              <Styled.PopupButton onClick={() => handleViewDetails(company)}>
                View Details
              </Styled.PopupButton>
            </Styled.PopupContainer>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
