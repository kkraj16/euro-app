import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getStaffPositions as getStaffPositionsApi,
  getStaffPositionById as getStaffPositionByIdApi,
  addNewStaffPosition as addNewStaffPositionApi,
  updateStaffPosition as updateStaffPositionApi,
  deleteStaffPosition as deleteStaffPositionApi,
} from "../../helpers/fakebackend_helper";
import { StaffPosition } from "./reducer";

export const getStaffPositions = createAsyncThunk(
  "staffPositions/getStaffPositions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getStaffPositionsApi();
      return response;
    } catch (error: any) {
      toast.error("Failed to fetch staff positions", { autoClose: 3000 });
      return rejectWithValue(error.message);
    }
  }
);

export const getStaffPositionById = createAsyncThunk(
  "staffPositions/getStaffPositionById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getStaffPositionByIdApi(id);
      return response;
    } catch (error: any) {
      toast.error("Failed to fetch staff position details", {
        autoClose: 3000,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const addNewStaffPosition = createAsyncThunk(
  "staffPositions/addNewStaffPosition",
  async (staffPosition: StaffPosition, { rejectWithValue }) => {
    try {
      const response = await addNewStaffPositionApi(staffPosition);
      toast.success("Staff position created successfully", { autoClose: 3000 });
      return response;
    } catch (error: any) {
      toast.error("Failed to create staff position", { autoClose: 3000 });
      return rejectWithValue(error.message);
    }
  }
);

export const updateStaffPosition = createAsyncThunk(
  "staffPositions/updateStaffPosition",
  async (staffPosition: StaffPosition, { rejectWithValue }) => {
    try {
      const response = await updateStaffPositionApi(staffPosition);
      toast.success("Staff position updated successfully", { autoClose: 3000 });
      return response;
    } catch (error: any) {
      toast.error("Failed to update staff position", { autoClose: 3000 });
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStaffPosition = createAsyncThunk(
  "staffPositions/deleteStaffPosition",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteStaffPositionApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
