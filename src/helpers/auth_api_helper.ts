import axios from "axios";

const BASE_API_URL = "https://app-fieldtrix-api-dev.azurewebsites.net/api/v1";

const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Login with Email - Request OTP
 * POST /UserFederatedAuth/LoginEmailOtc?emailId={email}
 * @param email - User email address
 * @returns Promise with userId, isNewUser, isInitialSetupDone
 */
export const loginByEmail = async (email: string) => {
  try {
    const response = await apiClient.post(
      `/UserFederatedAuth/LoginEmailOtc?emailId=${encodeURIComponent(email)}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to send OTP. Please try again."
    );
  }
};

/**
 * Verify Email OTP
 * POST /UserFederatedAuth/VerifyEmail?userId={userId}&otc={otp}
 * @param userId - User ID from login response
 * @param otc - OTP code entered by user
 * @returns Promise with JWT, refreshToken, user profile data
 */
export const verifyEmailOtp = async (userId: string, otc: string) => {
  try {
    const response = await apiClient.post(
      `/UserFederatedAuth/VerifyEmail?userId=${encodeURIComponent(
        userId
      )}&otc=${encodeURIComponent(otc)}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Invalid OTP. Please try again."
    );
  }
};

/**
 * Resend OTP (if API supports it)
 * POST /UserFederatedAuth/ResendOtp?userId={userId}
 * @param userId - User ID
 * @returns Promise with success confirmation
 */
export const resendOtp = async (userId: string) => {
  try {
    const response = await apiClient.post(
      `/UserFederatedAuth/ResendOtp?userId=${encodeURIComponent(userId)}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to resend OTP. Please try again."
    );
  }
};

/**
 * Set JWT token in axios headers for authenticated requests
 * @param token - JWT token
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

/**
 * Get the current API client instance
 */
export const getApiClient = () => apiClient;

export default apiClient;
