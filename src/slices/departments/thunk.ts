import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getDepartments as getDepartmentsApi,
  getDepartmentById as getDepartmentByIdApi,
  addNewDepartment as addNewDepartmentApi,
  updateDepartment as updateDepartmentApi,
  deleteDepartment as deleteDepartmentApi,
} from "../../helpers/fakebackend_helper";

export const getDepartments = createAsyncThunk(
  "departments/getDepartments",
  async () => {
    try {
      const response = getDepartmentsApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getDepartmentById = createAsyncThunk(
  "departments/getDepartmentById",
  async (id: number) => {
    try {
      const response = getDepartmentByIdApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addNewDepartment = createAsyncThunk(
  "departments/addNewDepartment",
  async (department: any) => {
    try {
      const response = addNewDepartmentApi(department);
      const data = await response;
      toast.success("Department Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("Department Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async (department: any) => {
    try {
      const response = updateDepartmentApi(department.id, department);
      const data = await response;
      toast.success("Department Updated Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("Department Updated Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (department: any) => {
    try {
      const response = deleteDepartmentApi(department);
      toast.success("Department Deleted Successfully", { autoClose: 3000 });
      return { department, ...response };
    } catch (error) {
      toast.error("Department Delete Failed", { autoClose: 3000 });
      return error;
    }
  }
);
