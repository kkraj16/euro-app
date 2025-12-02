import { createSlice } from "@reduxjs/toolkit";
import {
  getDepartments,
  getDepartmentById,
  addNewDepartment,
  updateDepartment,
  deleteDepartment,
} from "./thunk";

export interface Department {
  id?: number;
  name: string;
  code: string;
  description: string;
  employeeCount?: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DepartmentsState {
  departments: Department[];
  department: Department | null;
  error: any;
  isDepartmentCreated: boolean;
  isDepartmentSuccess: boolean;
}

export const initialState: DepartmentsState = {
  departments: [],
  department: null,
  error: {},
  isDepartmentCreated: false,
  isDepartmentSuccess: false,
};

const DepartmentsSlice = createSlice({
  name: "DepartmentsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartments.fulfilled, (state: any, action: any) => {
      state.departments = action.payload;
      state.isDepartmentCreated = false;
      state.isDepartmentSuccess = true;
    });
    builder.addCase(getDepartments.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
      state.isDepartmentCreated = false;
      state.isDepartmentSuccess = false;
    });

    builder.addCase(getDepartmentById.fulfilled, (state: any, action: any) => {
      state.department = action.payload;
    });
    builder.addCase(getDepartmentById.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });

    builder.addCase(addNewDepartment.fulfilled, (state: any, action: any) => {
      state.departments.unshift(action.payload);
      state.isDepartmentCreated = true;
    });
    builder.addCase(addNewDepartment.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });

    builder.addCase(updateDepartment.fulfilled, (state: any, action: any) => {
      state.departments = state.departments.map((dept: any) =>
        dept.id === action.payload.id ? { ...dept, ...action.payload } : dept
      );
    });
    builder.addCase(updateDepartment.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });

    builder.addCase(deleteDepartment.fulfilled, (state: any, action: any) => {
      state.departments = state.departments.filter(
        (dept: any) =>
          dept.id.toString() !== action.payload.department.toString()
      );
    });
    builder.addCase(deleteDepartment.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });
  },
});

export default DepartmentsSlice.reducer;
