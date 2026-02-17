'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import debounce from 'lodash/debounce';
import * as Styled from '../styled';
import Text from '@/components/Text';
import SearchInput, { SearchInputStyled } from '@/components/SearchInput';

let providerPromise: Promise<any> | null = null;

function getProvider() {
  if (!providerPromise) {
    providerPromise = import('leaflet-geosearch').then(
      (mod) => new mod.OpenStreetMapProvider()
    );
  }
  return providerPromise;
}

interface INearMeControlsProps {
  radius: number;
  onRadiusChange: (radius: number) => void;
  onPlaceSelect: (location: { latitude: number; longitude: number }) => void;
}

export const NearMeControls: React.FC<INearMeControlsProps> = ({
  radius,
  onRadiusChange,
  onPlaceSelect,
}) => {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ label: string; x: number; y: number }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const radiusOptions = [
    { value: 'Infinity', label: t('nearMe.all') },
    { value: '1000', label: '1 km' },
    { value: '2000', label: '2 km' },
    { value: '5000', label: '5 km' },
    { value: '10000', label: '10 km' },
  ];

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (value.trim().length < 2) {
          setResults([]);
          setShowResults(false);
          return;
        }

        const provider = await getProvider();
        const searchResults = await provider.search({ query: value });
        setResults(searchResults.map((r: any) => ({ label: r.label, x: r.x, y: r.y })));
        setShowResults(searchResults.length > 0);
      }, 400),
    []
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSelect = (result: { label: string; x: number; y: number }) => {
    setQuery(result.label);
    setShowResults(false);
    onPlaceSelect({ latitude: result.y, longitude: result.x });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Styled.ControlsSection>
      <Styled.RadiusControls>
        <Text type="body" color="white">{t('nearMe.radius')}</Text>
        <Styled.RadiusDropdown
          options={radiusOptions}
          value={radius.toString()}
          onChange={(value) => onRadiusChange(Number(value))}
          variant="filled"
        />
      </Styled.RadiusControls>
      <SearchInput
        ref={wrapperRef}
        maxWidth="400px"
        placeholder={t('nearMe.searchPlaceholder')}
        value={query}
        onChange={handleInputChange}
        onFocus={() => results.length > 0 && setShowResults(true)}
      >
        {showResults && (
          <SearchInputStyled.SearchResults>
            {results.map((result, i) => (
              <SearchInputStyled.SearchResultItem key={i} onClick={() => handleSelect(result)}>
                {result.label}
              </SearchInputStyled.SearchResultItem>
            ))}
          </SearchInputStyled.SearchResults>
        )}
      </SearchInput>
    </Styled.ControlsSection>
  );
};
