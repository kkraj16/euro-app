import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getTenantRentalConfig as getTenantRentalConfigApi,
  updateTenantRentalConfig as updateTenantRentalConfigApi,
} from "../../helpers/fakebackend_helper";

export const getTenantRentalConfig = createAsyncThunk(
  "tenantRentalConfig/getTenantRentalConfig",
  async () => {
    try {
      const response = getTenantRentalConfigApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateTenantRentalConfig = createAsyncThunk(
  "tenantRentalConfig/updateTenantRentalConfig",
  async (config: any) => {
    try {
      const response = updateTenantRentalConfigApi(config);
      const data = await response;
      toast.success("Tenant Rental Configuration Updated Successfully", {
        autoClose: 3000,
      });
      return data;
    } catch (error) {
      toast.error("Tenant Rental Configuration Update Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);
