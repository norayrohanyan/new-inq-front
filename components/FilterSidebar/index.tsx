'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';
import Text from '@/components/Text';
import * as Styled from './styled';

export interface FilterOption {
  id: number | string;
  name: string;
}

export interface FilterSection {
  title: string;
  options: FilterOption[];
}

export interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedFilters: Record<string, any>, sortOption: string) => void;
  filters?: Record<string, FilterSection>;
  currentSort?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  onApply,
  filters = {},
  currentSort = 'recommended',
}) => {
  const t = useTranslations();
  
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const sortOptions = [
    { value: 'recommended', label: t('filters.recommended') },
    { value: 'newest', label: t('filters.newest') },
    { value: 'a-z', label: t('filters.aToZ') },
    { value: 'z-a', label: t('filters.zToA') },
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleFilterToggle = (sectionKey: string, optionValue: string) => {
    setSelectedFilters(prev => {
      const current = prev[sectionKey] || [];
      const isSelected = current.includes(optionValue);

      return {
        ...prev,
        [sectionKey]: isSelected
          ? current.filter(val => val !== optionValue)
          : [...current, optionValue],
      };
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({});
    setSelectedSort('recommended');
  };

  const handleApply = () => {
    // Transform filter arrays into pipe-separated strings for API
    const transformedFilters: Record<string, string> = {};
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        transformedFilters[key] = values.join('|');
      }
    });

    onApply(transformedFilters, selectedSort);
    onClose();
  };

  const hasActiveFilters = Object.keys(selectedFilters).some(
    key => selectedFilters[key].length > 0
  ) || selectedSort !== 'recommended';

  return (
    <>
      <Styled.Overlay $isOpen={isOpen} onClick={onClose} />
      <Styled.SidebarContainer $isOpen={isOpen}>
        <Styled.Header>
          <Text type="h3" color="white">
            {t('filters.filterAndSort')}
          </Text>
          <Styled.CloseButton onClick={onClose}>✕</Styled.CloseButton>
        </Styled.Header>

        <Styled.Content>
          {/* Sorting Options */}
          <Styled.Section>
            <Styled.SectionTitle>
              <Text type="h6" color="white">
                {t('filters.sortingOptions')}
              </Text>
            </Styled.SectionTitle>

            <Styled.OptionsContainer>
              {sortOptions.map((option) => (
                <Styled.RadioOption
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                >
                  <Styled.RadioButton checked={selectedSort === option.value}>
                    {selectedSort === option.value && <Styled.RadioInner />}
                  </Styled.RadioButton>
                  <Text type="body" color="white">
                    {option.label}
                  </Text>
                </Styled.RadioOption>
              ))}
            </Styled.OptionsContainer>
          </Styled.Section>

          {/* Dynamic Filter Sections */}
          {Object.entries(filters).map(([key, section]) => (
            <Styled.Section key={key}>
              <Styled.SectionHeader onClick={() => toggleSection(key)}>
                <Text type="h6" color="white">
                  {t(`filters.${key}`)}
                </Text>
                <Styled.ExpandIcon expanded={expandedSections[key]}>+</Styled.ExpandIcon>
              </Styled.SectionHeader>

              {expandedSections[key] && (
                <Styled.OptionsContainer>
                  {section.options.map((option) => {
                    // Use option.id for filter values to match API expectations
                    const optionId = String(option.id);
                    const isSelected = selectedFilters[key]?.includes(optionId) || false;

                    return (
                      <Styled.CheckboxOption
                        key={option.id}
                        onClick={() => handleFilterToggle(key, optionId)}
                      >
                        <Styled.Checkbox checked={isSelected}>
                          {isSelected && '✓'}
                        </Styled.Checkbox>
                        <Text type="body" color="white">
                          {option.name}
                        </Text>
                      </Styled.CheckboxOption>
                    );
                  })}
                </Styled.OptionsContainer>
              )}
            </Styled.Section>
          ))}
        </Styled.Content>

        <Styled.Footer>
          {hasActiveFilters && (
            <Styled.ClearButton onClick={handleClearAll}>
              {t('filters.clearAll')} ✕
            </Styled.ClearButton>
          )}
          <Button variant="primary" size="medium" fullWidth onClick={handleApply}>
            {t('filters.apply')}
          </Button>
        </Styled.Footer>
      </Styled.SidebarContainer>
    </>
  );
};

export default FilterSidebar;

