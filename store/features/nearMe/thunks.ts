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
      return response.data;
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
