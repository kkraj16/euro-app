import { createSlice } from "@reduxjs/toolkit";
import {
  getStaffPositions,
  getStaffPositionById,
  addNewStaffPosition,
  updateStaffPosition,
  deleteStaffPosition,
} from "./thunk";

export interface StaffPosition {
  id?: number;
  positionName: string;
  code: string;
  description: string;
  level: string;
  department: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StaffPositionsState {
  staffPositions: StaffPosition[];
  staffPosition: StaffPosition | null;
  error: any;
  isStaffPositionCreated: boolean;
  isStaffPositionSuccess: boolean;
}

export const initialState: StaffPositionsState = {
  staffPositions: [],
  staffPosition: null,
  error: {},
  isStaffPositionCreated: false,
  isStaffPositionSuccess: false,
};

const StaffPositionsSlice = createSlice({
  name: "StaffPositionsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStaffPositions.fulfilled, (state: any, action: any) => {
      state.staffPositions = action.payload;
      state.isStaffPositionCreated = false;
      state.isStaffPositionSuccess = true;
    });
    builder.addCase(getStaffPositions.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
      state.isStaffPositionCreated = false;
      state.isStaffPositionSuccess = false;
    });

    builder.addCase(
      getStaffPositionById.fulfilled,
      (state: any, action: any) => {
        state.staffPosition = action.payload;
      }
    );
    builder.addCase(
      getStaffPositionById.rejected,
      (state: any, action: any) => {
        state.error = action.payload?.error || null;
      }
    );

    builder.addCase(
      addNewStaffPosition.fulfilled,
      (state: any, action: any) => {
        state.staffPositions.unshift(action.payload);
        state.isStaffPositionCreated = true;
      }
    );
    builder.addCase(addNewStaffPosition.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });

    builder.addCase(
      updateStaffPosition.fulfilled,
      (state: any, action: any) => {
        state.staffPositions = state.staffPositions.map((position: any) =>
          position.id === action.payload.id
            ? { ...position, ...action.payload }
            : position
        );
      }
    );
    builder.addCase(updateStaffPosition.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });

    builder.addCase(
      deleteStaffPosition.fulfilled,
      (state: any, action: any) => {
        state.staffPositions = state.staffPositions.filter(
          (position: any) =>
            position.id.toString() !== action.payload.staffPosition.toString()
        );
      }
    );
    builder.addCase(deleteStaffPosition.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });
  },
});

export default StaffPositionsSlice.reducer;
