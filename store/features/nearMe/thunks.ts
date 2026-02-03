import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { INearMeParams, INearMeCompany } from '@/store/types/nearMe';

export const getCompaniesNearMeThunk = createAsyncThunk<
  INearMeCompany[],
  INearMeParams,
  { rejectValue: string }
>('nearMe/getCompaniesNearMe', async (params, { rejectWithValue }) => {
  try {
    const response = await apiService.getCompaniesNearMe(params);
    if (response.success && response.data) {
      // Transform the data to ensure latitude and longitude are numbers
      const transformedData = response.data.map((company: any) => ({
        ...company,
        latitude: typeof company.latitude === 'string'
          ? parseFloat(company.latitude)
          : company.latitude,
        longitude: typeof company.longitude === 'string'
          ? parseFloat(company.longitude)
          : company.longitude,
      }));
      return transformedData;
    }
    return rejectWithValue(
      typeof response.error === 'string'
        ? response.error
        : 'Failed to fetch nearby companies'
    );
  } catch (error) {
    return rejectWithValue('Failed to fetch nearby companies');
  }
});
