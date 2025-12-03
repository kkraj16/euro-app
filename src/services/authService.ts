/**
 * Authentication Service
 * Integrates with external API endpoints for Email OTP login flow
 */

const BASE_URL = "https://app-fieldtrix-api-dev.azurewebsites.net/api/v1";

// Headers required by the API
const getDefaultHeaders = () => ({
  accept: "application/json;odata.metadata=minimal;odata.streaming=true",
  "Content-Type": "application/json",
});

/**
 * Step 1: Request OTP for email login
 * @param email - User's email address
 * @returns Promise with userId, isNewUser, isInitialSetupDone
 */
export const requestEmailOtp = async (email: string) => {
  try {
    const url = `${BASE_URL}/UserFederatedAuth/LoginEmailOtc?emailId=${encodeURIComponent(
      email
    )}`;

    const response = await fetch(url, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: "", // Empty body as per API specification
    });

    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = await response.json();

        // Handle validation errors from API
        if (errorData.errors) {
          // Extract first error message from errors object
          const firstErrorKey = Object.keys(errorData.errors)[0];
          if (firstErrorKey && errorData.errors[firstErrorKey]?.length > 0) {
            errorMessage = errorData.errors[firstErrorKey][0];
          }
        } else if (errorData.title) {
          errorMessage = errorData.title;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    // Re-throw with clean error message
    throw error;
  }
};

/**
 * Step 2: Verify OTP and get JWT session
 * @param userId - User ID from LoginEmailOtc response
 * @param otp - 6-digit OTP code
 * @returns Promise with jwt, refreshToken, user details, etc.
 */
export const verifyEmailOtp = async (userId: string, otp: string) => {
  try {
    const url = `${BASE_URL}/UserFederatedAuth/VerifyEmail?userId=${encodeURIComponent(
      userId
    )}&otc=${encodeURIComponent(otp)}&isAppleDevice=false`;

    const response = await fetch(url, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: "", // Empty body as per API specification
    });

    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = await response.json();

        // Handle validation errors from API
        if (errorData.errors) {
          // Extract first error message from errors object
          const firstErrorKey = Object.keys(errorData.errors)[0];
          if (firstErrorKey && errorData.errors[firstErrorKey]?.length > 0) {
            errorMessage = errorData.errors[firstErrorKey][0];
          }
        } else if (errorData.title) {
          errorMessage = errorData.title;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    // Re-throw with clean error message
    throw error;
  }
};

/**
 * Optional: Refresh JWT token
 * @param refreshToken - Refresh token from VerifyEmail response
 * @returns Promise with new jwt token
 */
export const refreshJwtToken = async (refreshToken: string) => {
  try {
    const url = `${BASE_URL}/UserFederatedAuth/RefreshToken`;

    const response = await fetch(url, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to refresh token: ${error.message}`);
  }
};
