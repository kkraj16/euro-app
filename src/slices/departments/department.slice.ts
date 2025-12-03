import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    initialDepartments,
    DepartmentItem,
    DepartmentsResponse,
} from "./department.fakeData";
import * as departmentService from "../../services/departmentService";

interface DepartmentState {
    items: DepartmentItem[];
    selectedDepartment: DepartmentItem | null;
    loading: boolean;
    error: string | null;
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

const initialState: DepartmentState = {
    items: initialDepartments,
    selectedDepartment: null,
    loading: false,
    error: null,
    pageNumber: 1,
    pageSize: 500,
    totalCount: 0,
    totalPages: 0,
};

// Async thunk to fetch departments from API
export const fetchDepartments = createAsyncThunk(
    "departments/fetchDepartments",
    async ({
        pageNumber = 1,
        pageSize = 500,
    }: {
        pageNumber?: number;
        pageSize?: number;
    } = {}) => {
        const response: DepartmentsResponse = await departmentService.getAllDepartments(
            pageNumber,
            pageSize
        );
        return response;
    }
);

// Async thunk to create a new department
export const createDepartment = createAsyncThunk(
    "departments/createDepartment",
    async (data: Partial<DepartmentItem>) => {
        const response = await departmentService.createDepartment(data);
        return response;
    }
);

// Async thunk to update an existing department
export const updateDepartment = createAsyncThunk(
    "departments/updateDepartment",
    async ({ id, data }: { id: string; data: Partial<DepartmentItem> }) => {
        const response = await departmentService.updateDepartment(id, data);
        return response;
    }
);

// Async thunk to delete a department
export const deleteDepartment = createAsyncThunk(
    "departments/deleteDepartment",
    async (id: string) => {
        await departmentService.deleteDepartment(id);
        return id;
    }
);

const departmentSlice = createSlice({
    name: "Departments",
    initialState,
    reducers: {
        selectDepartment(state, action: PayloadAction<string>) {
            state.selectedDepartment =
                state.items.find((d) => d.id === action.payload) || null;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch departments
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalCount = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch departments";
            })
            // Create department
            .addCase(createDepartment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDepartment.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createDepartment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create department";
            })
            // Update department
            .addCase(updateDepartment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDepartment.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateDepartment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update department";
            })
            // Delete department
            .addCase(deleteDepartment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDepartment.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete department";
            });
    },
});

export const { selectDepartment, clearError } = departmentSlice.actions;
export default departmentSlice.reducer;

// Selectors
export const selectDepartmentList = (state: any) => state.Departments.items;
export const selectSelectedDepartment = (state: any) => state.Departments.selectedDepartment;
export const selectDepartmentById = (state: any, id: string) =>
    state.Departments.items.find((d: DepartmentItem) => d.id === id);
export const selectDepartmentLoading = (state: any) => state.Departments.loading;
export const selectDepartmentError = (state: any) => state.Departments.error;
export const selectDepartmentTotalCount = (state: any) => state.Departments.totalCount;
