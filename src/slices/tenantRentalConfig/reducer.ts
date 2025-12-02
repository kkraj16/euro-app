import { createSlice } from "@reduxjs/toolkit";
import { getTenantRentalConfig, updateTenantRentalConfig } from "./thunk";

export interface TenantRentalConfig {
  id: number;
  gracePeriodEnabled: boolean;
  gracePeriodDays: number;
  minimumHireEnabled: boolean;
  minimumHireWeeks: number;
  includeWeekends: boolean;
  excludePublicHolidays: boolean;
  notifyOnOverdue: boolean;
  offHireReminderDays: number;
  updatedAt?: string;
}

export interface TenantRentalConfigState {
  config: TenantRentalConfig | null;
  error: any;
  isConfigSuccess: boolean;
}

export const initialState: TenantRentalConfigState = {
  config: null,
  error: {},
  isConfigSuccess: false,
};

const TenantRentalConfigSlice = createSlice({
  name: "TenantRentalConfigSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getTenantRentalConfig.fulfilled,
      (state: any, action: any) => {
        state.config = action.payload;
        state.isConfigSuccess = true;
      }
    );
    builder.addCase(
      getTenantRentalConfig.rejected,
      (state: any, action: any) => {
        state.error = action.payload?.error || null;
        state.isConfigSuccess = false;
      }
    );

    builder.addCase(
      updateTenantRentalConfig.fulfilled,
      (state: any, action: any) => {
        state.config = action.payload;
        state.isConfigSuccess = true;
      }
    );
    builder.addCase(
      updateTenantRentalConfig.rejected,
      (state: any, action: any) => {
        state.error = action.payload?.error || null;
        state.isConfigSuccess = false;
      }
    );
  },
});

export default TenantRentalConfigSlice.reducer;
