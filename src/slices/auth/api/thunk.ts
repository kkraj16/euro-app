import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginByEmail,
  verifyEmailOtp,
  resendOtp,
} from "../../../helpers/auth_api_helper";

/**
 * Thunk: Login with Email - Requests OTP
 */
export const loginWithEmailOtp = createAsyncThunk(
  "auth/loginWithEmailOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await loginByEmail(email);
      return {
        userId: response.userId,
        isNewUser: response.isNewUser,
        isInitialSetupDone: response.isInitialSetupDone,
        email: email,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Thunk: Verify OTP and get JWT token
 */
export const verifyOtpAndLogin = createAsyncThunk(
  "auth/verifyOtpAndLogin",
  async (
    { userId, otc }: { userId: string; otc: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await verifyEmailOtp(userId, otc);
      return {
        jwt: response.jwt,
        refreshToken: response.refreshToken,
        expiresAt: response.expiresAt,
        userId: response.userId,
        profileId: response.profileId,
        roleName: response.roleName,
        userName: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        tenantId: response.tenantId,
        passKey: response.passKey,
        isNewUser: response.isNewUser,
        avatarUrl: response.avatarUrl || null,
        trackingInterval: response.trackingInterval,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Thunk: Resend OTP
 */
export const resendOtpCode = createAsyncThunk(
  "auth/resendOtpCode",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await resendOtp(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
