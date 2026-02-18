'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { isServiceCategory } from '@/consts/categoryTemplates';

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

const locationIcon = L.divIcon({
  className: 'map-click-marker',
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #FE7F3B 0%, #FE7F3Bdd 100%);
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

function MapClickHandler({ onClick }: { onClick: (location: { latitude: number; longitude: number }) => void }) {
  useMapEvents({
    click(e) {
      onClick({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    },
  });
  return null;
}

function LocateControl({ onLocate }: { onLocate?: (location: { latitude: number; longitude: number }) => void }) {
  const map = useMap();

  useEffect(() => {
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
      drawMarker: false,
      drawCircle: false,
    });

    locate.addTo(map);

    const handleLocationFound = (e: L.LocationEvent) => {
      onLocate?.({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    };

    map.on('locationfound', handleLocationFound);

    return () => {
      map.off('locationfound', handleLocationFound);
      locate.remove();
    };
  }, [map, onLocate]);

  return null;
}

/* =========================
   Props
========================= */

interface INearMeMapProps {
  companies: INearMeCompany[];
  activeLocation: { latitude: number; longitude: number } | null;
  radius: number;
  isLoading: boolean;
  onMapClick?: (location: { latitude: number; longitude: number }) => void;
  onLocate?: (location: { latitude: number; longitude: number }) => void;
}

/* =========================
   Component
========================= */

export const NearMeMap: React.FC<INearMeMapProps> = ({
  companies,
  activeLocation,
  radius,
  isLoading,
  onMapClick,
  onLocate,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const mapRef = useRef<L.Map | null>(null);

  const defaultCenter: [number, number] = [40.1792, 44.4991];

  const center = useMemo<[number, number]>(() => {
    if (activeLocation) {
      return [activeLocation.latitude, activeLocation.longitude];
    }
    if (companies.length > 0) {
      return [companies[0].latitude, companies[0].longitude];
    }
    return defaultCenter;
  }, [activeLocation, companies]);

  const handleViewDetails = (company: INearMeCompany) => {
    mapRef.current?.closePopup();

    const path = isServiceCategory(company.category)
      ? `/${locale}/detail/${company.category}/${company.id}`
      : `/${locale}/categories/${company.category}/company/${company.id}`;

    setTimeout(() => router.push(path), 0);
  };

  const formatDistance = (meters?: number) => {
    if (!meters) return null;
    if (meters < 1000) return `${Math.round(meters)}m`;
    return `${(meters / 1000).toFixed(1)}km`;
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {isLoading && (
        <Styled.MapLoadingOverlay>
          <div className="spinner" />
        </Styled.MapLoadingOverlay>
      )}
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
      <LocateControl onLocate={onLocate} />
      {onMapClick && <MapClickHandler onClick={onMapClick} />}

      {activeLocation && (
        <Marker
          position={[activeLocation.latitude, activeLocation.longitude]}
          icon={locationIcon}
        >
          <Popup>
            <strong>Your location</strong>
          </Popup>
        </Marker>
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
                    <StarIcon width="12" height="12" />
                    <Styled.PopupRating>
                      {typeof company.rating === 'number'
                        ? company.rating.toFixed(1)
                        : company.rating}
                    </Styled.PopupRating>
                  </Styled.PopupInfoRow>
                )}

                {company.distance && (
                  <Styled.PopupInfoRow>
                    <LocationIcon width="14" height="14" /> {formatDistance(company.distance)} away
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
    </div>
  );
};
