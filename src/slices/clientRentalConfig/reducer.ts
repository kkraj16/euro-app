import { createSlice } from "@reduxjs/toolkit";
import {
  getClientRentalConfigs,
  getClientRentalConfigByClientId,
  updateClientRentalConfig,
} from "./thunk";

export interface ClientRentalConfig {
  id: number;
  clientId: number;
  clientName: string;
  overrideGracePeriod: boolean;
  gracePeriodDays: number;
  overrideMinimumHire: boolean;
  minimumHireWeeks: number;
  overrideIncludeWeekends: boolean;
  includeWeekends: boolean;
  overrideExcludePublicHolidays: boolean;
  excludePublicHolidays: boolean;
  updatedAt?: string;
}

export interface ClientRentalConfigState {
  configs: ClientRentalConfig[];
  config: ClientRentalConfig | null;
  error: any;
  isConfigSuccess: boolean;
}

export const initialState: ClientRentalConfigState = {
  configs: [],
  config: null,
  error: {},
  isConfigSuccess: false,
};

const ClientRentalConfigSlice = createSlice({
  name: "ClientRentalConfigSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getClientRentalConfigs.fulfilled,
      (state: any, action: any) => {
        state.configs = action.payload;
        state.isConfigSuccess = true;
      }
    );
    builder.addCase(
      getClientRentalConfigs.rejected,
      (state: any, action: any) => {
        state.error = action.payload?.error || null;
        state.isConfigSuccess = false;
      }
    );

    builder.addCase(
      getClientRentalConfigByClientId.fulfilled,
      (state: any, action: any) => {
        state.config = action.payload;
        state.isConfigSuccess = true;
      }
    );
    builder.addCase(
      getClientRentalConfigByClientId.rejected,
      (state: any, action: any) => {
        state.error = action.payload?.error || null;
        state.isConfigSuccess = false;
      }
    );

    builder.addCase(
      updateClientRentalConfig.fulfilled,
      (state: any, action: any) => {
        state.configs = state.configs.map((config: any) =>
          config.clientId === action.payload.clientId
            ? { ...config, ...action.payload }
            : config
        );
        state.config = action.payload;
        state.isConfigSuccess = true;
      }
    );
    builder.addCase(
      updateClientRentalConfig.rejected,
      (state: any, action: any) => {
        state.error = action.payload?.error || null;
        state.isConfigSuccess = false;
      }
    );
  },
});

export default ClientRentalConfigSlice.reducer;
