'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from 'react-leaflet';
import L from 'leaflet';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import 'leaflet/dist/leaflet.css';

// ✅ IMPORTANT: correct locate control imports
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.js';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

import { INearMeCompany } from '@/store/types/nearMe';
import { LocationIcon, StarIcon, ClockIcon } from '@/components/icons';
import * as Styled from '../styled';

/* =========================
   Custom marker icons
========================= */

const createCustomIcon = (isOpen?: boolean) => {
  const color =
    isOpen === undefined ? '#FE7F3B' : isOpen ? '#4CAF50' : '#FF5C5C';

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

const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="
      width: 30px;
      height: 30px;
      background: #3866FF;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 4px 16px rgba(56, 102, 255, 0.8);
      animation: pulse 2s ease-in-out infinite;
    "></div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
    </style>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

/* =========================
   Helpers
========================= */

function MapUpdater({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

function LocateControl() {
  const map = useMap();

  useEffect(() => {
    // ✅ this now exists because import is correct
    const locate = (L.control as any).locate({
      position: 'topleft',
      strings: {
        title: 'Show my location',
      },
      locateOptions: {
        enableHighAccuracy: true,
      },
      flyTo: true,
      keepCurrentZoomLevel: false,
      drawMarker: false, // Don't draw the locate control's marker
      drawCircle: false, // Don't draw the accuracy circle
    });

    locate.addTo(map);

    return () => {
      locate.remove();
    };
  }, [map]);

  return null;
}

/* =========================
   Props
========================= */

interface INearMeMapProps {
  companies: INearMeCompany[];
  userLocation: { latitude: number; longitude: number } | null;
  radius: number;
  isLoading: boolean;
}

/* =========================
   Component
========================= */

export const NearMeMap: React.FC<INearMeMapProps> = ({
  companies,
  userLocation,
  radius,
  isLoading,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const mapRef = useRef<L.Map | null>(null);

  const defaultCenter: [number, number] = [40.1792, 44.4991];

  const center = useMemo<[number, number]>(() => {
    if (userLocation) {
      return [userLocation.latitude, userLocation.longitude];
    }
    if (companies.length > 0) {
      return [companies[0].latitude, companies[0].longitude];
    }
    return defaultCenter;
  }, [userLocation, companies]);

  const handleViewDetails = (company: INearMeCompany) => {
    router.push(
      `/${locale}/categories/${company.category}/company/${company.id}`
    );
  };

  const formatDistance = (meters?: number) => {
    if (!meters) return null;
    if (meters < 1000) return `${Math.round(meters)}m`;
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
      zoomControl
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapUpdater center={center} zoom={13} />
      <LocateControl />

      {userLocation && (
        <>
          <Marker
            position={[
              userLocation.latitude,
              userLocation.longitude,
            ]}
            icon={userLocationIcon}
          >
            <Popup>
              <strong>Your location</strong>
            </Popup>
          </Marker>
        </>
      )}

      {companies.map((company) => (
        <Marker
          key={company.id}
          position={[company.latitude, company.longitude]}
          icon={createCustomIcon(company.is_open)}
        >
          <Popup>
            <Styled.PopupContainer>
              {(company.logo || company.image_url) && (
                <Styled.PopupImage
                  $src={company.logo || company.image_url || ''}
                />
              )}

              <Styled.PopupTitle>
                {company.name}
              </Styled.PopupTitle>

              <Styled.PopupInfo>
                <Styled.PopupInfoRow>
                  <LocationIcon width="14" height="14" />
                  <span>{company.address}</span>
                </Styled.PopupInfoRow>

                {company.is_open !== undefined && (
                  <Styled.PopupInfoRow>
                    <ClockIcon width="14" height="14" />
                    <Styled.PopupStatus
                      $isOpen={company.is_open}
                    >
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
                    📍 {formatDistance(company.distance)} away
                  </Styled.PopupInfoRow>
                )}
              </Styled.PopupInfo>

              <Styled.PopupButton
                onClick={() => handleViewDetails(company)}
              >
                View Details
              </Styled.PopupButton>
            </Styled.PopupContainer>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
