import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getClientRentalConfigs as getClientRentalConfigsApi,
  getClientRentalConfigByClientId as getClientRentalConfigByClientIdApi,
  updateClientRentalConfig as updateClientRentalConfigApi,
} from "../../helpers/fakebackend_helper";

export const getClientRentalConfigs = createAsyncThunk(
  "clientRentalConfig/getClientRentalConfigs",
  async () => {
    try {
      const response = getClientRentalConfigsApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getClientRentalConfigByClientId = createAsyncThunk(
  "clientRentalConfig/getClientRentalConfigByClientId",
  async (clientId: number) => {
    try {
      const response = getClientRentalConfigByClientIdApi(clientId);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateClientRentalConfig = createAsyncThunk(
  "clientRentalConfig/updateClientRentalConfig",
  async (config: any) => {
    try {
      const response = updateClientRentalConfigApi(config.clientId, config);
      const data = await response;
      toast.success("Client Rental Configuration Updated Successfully", {
        autoClose: 3000,
      });
      return data;
    } catch (error) {
      toast.error("Client Rental Configuration Update Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);
