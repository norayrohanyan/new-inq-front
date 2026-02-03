/**
 * Transform filters from UI format to API format
 *
 * @param filters - Filter object from UI (e.g., { subcategory: "veniam|sapiente" })
 * @param isCompanies - Whether the filters are for companies (true) or services (false)
 * @returns Transformed filters for API (e.g., { categories: "veniam|sapiente" })
 */
export const transformFiltersForAPI = (
  filters: Record<string, string> | undefined,
  isCompanies: boolean
): Record<string, string> | undefined => {
  if (!filters || Object.keys(filters).length === 0) {
    return undefined;
  }

  const apiFilters: Record<string, string> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (key === 'subcategory') {
      // Map subcategory to the correct API key based on endpoint
      const apiKey = isCompanies ? 'categories' : 'services';
      apiFilters[apiKey] = value;
    } else {
      // Keep other filter keys as-is
      apiFilters[key] = value;
    }
  });

  return Object.keys(apiFilters).length > 0 ? apiFilters : undefined;
};
