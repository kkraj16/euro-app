import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
  sessionToken: null, // Temporary token after Step 1
  otpSent: false,
  otpVerified: false,
  otpLoading: false,
  otpError: "",
  otpResendCount: 0,
  otpExpiry: null,
  userEmail: "", // Store email from Step 1 for display
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    // Step 1 Success: Generate OTP and store session token
    otpGenerated(state, action) {
      state.sessionToken = action.payload.sessionToken;
      state.userEmail = action.payload.userEmail;
      state.otpSent = true;
      state.otpError = "";
      state.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    },

    // Step 2 Success: OTP verified
    otpVerifiedSuccess(state) {
      state.otpVerified = true;
      state.otpLoading = false;
      state.otpError = "";
    },

    // OTP verification loading
    otpLoading(state) {
      state.otpLoading = true;
      state.otpError = "";
    },

    // OTP error
    otpError(state, action) {
      state.otpError = action.payload;
      state.otpLoading = false;
    },

    // Resend OTP
    otpResent(state) {
      state.otpResendCount += 1;
      state.otpExpiry = Date.now() + 5 * 60 * 1000; // Reset expiry
      state.otpError = "";
    },

    // Reset OTP state
    resetOtpState(state) {
      return initialState;
    },

    // Clear OTP data (after successful login)
    clearOtpData(state) {
      state.sessionToken = null;
      state.otpSent = false;
      state.otpVerified = false;
      state.userEmail = "";
    },
  },
});

export const {
  otpGenerated,
  otpVerifiedSuccess,
  otpLoading,
  otpError,
  otpResent,
  resetOtpState,
  clearOtpData,
} = otpSlice.actions;

export default otpSlice.reducer;
