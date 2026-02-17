'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  categoriesSelectors,
  filtersSelectors,
  getCompaniesFiltersThunk,
  getServicesFiltersThunk,
} from '@/store';
import {
  CategoriesBanner,
  CategoriesToggle,
  CategoriesSearch,
  CategoriesContent,
} from '../components';
import { CategoriesChips } from '@/components/CategoriesChips';
import FilterSidebar from '@/components/FilterSidebar';
import FilterButton from '@/components/FilterButton';
import FilterChips, { FilterChip } from '@/components/FilterChips';
import * as Styled from '../styled';
import { useIsMobile, useFavorites } from '@/hooks';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const categorySlug = params.category as string;

  // Get current category data
  const categories = useAppSelector(categoriesSelectors.categories);
  const currentCategory = categories.find(cat => cat.slug === categorySlug);
  const isMobile = useIsMobile();

  // Local state
  const [showCompanies, setShowCompanies] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [sortOption, setSortOption] = useState<string>('recommended');

  // Get filters from Redux
  const companiesFilters = useAppSelector(filtersSelectors.companiesFilters);
  const servicesFilters = useAppSelector(filtersSelectors.servicesFilters);
  const filters = showCompanies ? companiesFilters : servicesFilters;

  useFavorites();
  
  // Auto-set the correct toggle state based on category
  useEffect(() => {
    if (currentCategory?.switch) {
      // Check if both Companies and Services/Items exist in the switch
      const switchKeys = Object.keys(currentCategory.switch);
      const hasCompanies = switchKeys.includes('Companies');
      const hasServices = switchKeys.some(key => key !== 'Companies'); // Apartments, Cars, Services, etc.
      
      // If the category supports both, default to showing what the API calls "Companies"
      // For rental categories (apartment_rental, car_rental), "Companies" means companies that rent items
      // The toggle should default to showing companies if both options exist
      if (hasCompanies && hasServices) {
        // Default to companies (the provider/owner)
        setShowCompanies(true);
      } else if (hasCompanies) {
        setShowCompanies(true);
      } else {
        setShowCompanies(false);
      }
    }
  }, [currentCategory?.slug]); // Only run when category changes, not on every currentCategory update

  // Fetch filters when category or toggle changes
  useEffect(() => {
    if (!categorySlug) return;

    if (showCompanies) {
      dispatch(getCompaniesFiltersThunk(categorySlug));
    } else {
      dispatch(getServicesFiltersThunk(categorySlug));
    }
  }, [categorySlug, showCompanies, dispatch]);

  // Handlers
  const handleCategoryChange = useCallback((slug: string) => {
    router.push(`/${locale}/categories/${slug}`);
    setCurrentPage(1);
  }, [locale, router]);

  const handleToggleChange = useCallback(() => {
    setShowCompanies((prev) => !prev);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleFilterClick = useCallback(() => {
    setIsFilterOpen(true);
  }, []);

  const handleFilterClose = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const handleApplyFilters = useCallback((filters: Record<string, any>, sort: string) => {
    setSelectedFilters(filters);
    setSortOption(sort);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Convert selected filters to chip format with readable labels
  const activeFilterChips = useMemo((): FilterChip[] => {
    const chips: FilterChip[] = [];

    // Add filter chips
    Object.entries(selectedFilters).forEach(([filterKey, filterValue]) => {
      if (typeof filterValue === 'string' && filterValue) {
        const filterSection = filters[filterKey];
        if (filterSection) {
          // Split pipe-separated IDs
          const selectedIds = filterValue.split('|');

          selectedIds.forEach(id => {
            // Find the option with this ID to get the readable name
            const option = filterSection.options.find(opt => String(opt.id) === id);
            if (option) {
              chips.push({
                key: filterKey,
                value: id,
                label: option.name,
              });
            }
          });
        }
      }
    });

    // Add sort chip if not default
    if (sortOption && sortOption !== 'recommended') {
      chips.push({
        key: 'sort',
        value: sortOption,
        label: t(`filters.${sortOption}`),
      });
    }

    return chips;
  }, [selectedFilters, sortOption, filters, t]);

  // Remove individual filter chip
  const handleRemoveFilter = useCallback((key: string, value: string) => {
    if (key === 'sort') {
      setSortOption('recommended');
    } else {
      setSelectedFilters(prev => {
        const currentValue = prev[key];
        if (!currentValue) return prev;

        // Split the pipe-separated values
        const values = currentValue.split('|');
        const newValues = values.filter((v: string) => v !== value);

        if (newValues.length === 0) {
          // Remove the key entirely if no values left
          const { [key]: _, ...rest } = prev;
          return rest;
        } else {
          // Join remaining values back with pipe
          return {
            ...prev,
            [key]: newValues.join('|'),
          };
        }
      });
    }
    setCurrentPage(1);
  }, []);

  // Clear all filters
  const handleClearAllFilters = useCallback(() => {
    setSelectedFilters({});
    setSortOption('recommended');
    setCurrentPage(1);
  }, []);

  return (
    <Styled.PageContainer>
      <CategoriesBanner />

      <CategoriesChips
        selectedCategory={categorySlug}
        onCategoryChange={handleCategoryChange}
      />

      {/* Combined Toggle and Search Section */}
      <Styled.ToggleSearchSection>
        {isMobile ? (
          <>
            <Styled.ToggleFilterRow>
              {currentCategory && (
                <CategoriesToggle
                  showCompanies={showCompanies}
                  onToggleChange={handleToggleChange}
                  categorySwitch={currentCategory.switch}
                />
              )}
              <FilterButton onClick={handleFilterClick} />
            </Styled.ToggleFilterRow>
            <CategoriesSearch
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </>
        ) : (
          <>
            {currentCategory && (
              <CategoriesToggle
                showCompanies={showCompanies}
                onToggleChange={handleToggleChange}
                categorySwitch={currentCategory.switch}
              />
            )}
            <CategoriesSearch
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
            <FilterButton onClick={handleFilterClick} />
          </>
        )}
      </Styled.ToggleSearchSection>

      {/* Active Filter Chips */}
      <FilterChips
        activeFilters={activeFilterChips}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAllFilters}
      />

      <Styled.ContentSection>
        {currentCategory && (
          <CategoriesContent
            key={`${categorySlug}-${showCompanies}-${JSON.stringify(selectedFilters)}`}
            selectedCategory={categorySlug}
            showCompanies={showCompanies}
            searchTerm={searchTerm}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            categorySwitch={currentCategory.switch}
            sortOption={sortOption}
            filters={selectedFilters}
          />
        )}
      </Styled.ContentSection>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={handleFilterClose}
        onApply={handleApplyFilters}
        filters={filters}
        currentSort={sortOption}
      />
    </Styled.PageContainer>
  );
}

