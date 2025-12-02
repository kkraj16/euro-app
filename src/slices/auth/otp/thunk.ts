import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLoginWithOtp,
  postJwtLogin,
  postFakeOtpVerify,
  postFakeOtpResend,
  postJwtOtpVerify,
  postJwtOtpResend,
} from "../../../helpers/fakebackend_helper";

import {
  otpGenerated,
  otpVerifiedSuccess,
  otpLoading,
  otpError,
  otpResent,
  clearOtpData,
} from "./reducer";

import { loginSuccess } from "../login/reducer";

// Step 1: Initial login that triggers OTP
export const initiateLoginWithOtp =
  (credentials: any) => async (dispatch: any) => {
    try {
      dispatch(otpLoading());
      let response;

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const fireBaseBackend: any = getFirebaseBackend();
        response = fireBaseBackend.loginUser(
          credentials.email,
          credentials.password
        );
      } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
        response = postJwtLogin({
          email: credentials.email,
          password: credentials.password,
        });
      } else {
        // Fake backend (default)
        response = postFakeLoginWithOtp({
          email: credentials.email,
          password: credentials.password,
        });
      }

      const data = await response;

      if (data) {
        let sessionToken, userEmail;

        if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
          const finalData: any = JSON.parse(JSON.stringify(data));
          if (finalData.status === "success") {
            sessionToken = finalData.data.sessionToken; // Temporary token
            userEmail = credentials.email;
            dispatch(
              otpGenerated({
                sessionToken,
                userEmail,
              })
            );
          } else {
            dispatch(otpError(finalData.message || "Login failed"));
          }
        } else {
          // Firebase or JWT
          sessionToken = data.sessionToken;
          userEmail = credentials.email;
          dispatch(
            otpGenerated({
              sessionToken,
              userEmail,
            })
          );
        }
      }
    } catch (error: any) {
      dispatch(otpError(error.message || "Login failed"));
    }
  };

// Step 2: Verify OTP and complete login
export const verifyOtp =
  (sessionToken: string, otp: string, history: any) =>
  async (dispatch: any) => {
    try {
      dispatch(otpLoading());
      let response;

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const fireBaseBackend: any = getFirebaseBackend();
        response = fireBaseBackend.verifyOtp(sessionToken, otp);
      } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
        response = postJwtOtpVerify({
          sessionToken,
          otp,
        });
      } else {
        // Fake backend (default)
        response = postFakeOtpVerify({
          sessionToken,
          otp,
        });
      }

      const data = await response;

      if (data) {
        let userData;

        if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
          const finalData: any = JSON.parse(JSON.stringify(data));
          if (finalData.status === "success") {
            userData = finalData.data;
            // Store auth tokens
            sessionStorage.setItem("authUser", JSON.stringify(userData));
            localStorage.setItem("user", JSON.stringify(userData));

            dispatch(otpVerifiedSuccess());
            dispatch(clearOtpData());
            dispatch(loginSuccess(userData));

            history("/dashboard");
          } else {
            dispatch(otpError(finalData.message || "OTP verification failed"));
          }
        } else {
          // Firebase or JWT
          userData = data;
          sessionStorage.setItem("authUser", JSON.stringify(userData));
          localStorage.setItem("user", JSON.stringify(userData));

          dispatch(otpVerifiedSuccess());
          dispatch(clearOtpData());
          dispatch(loginSuccess(userData));

          history("/dashboard");
        }
      }
    } catch (error: any) {
      dispatch(otpError(error.message || "OTP verification failed"));
    }
  };

// Resend OTP
export const resendOtp = (sessionToken: string) => async (dispatch: any) => {
  try {
    dispatch(otpLoading());
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend: any = getFirebaseBackend();
      response = fireBaseBackend.resendOtp(sessionToken);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = postJwtOtpResend({
        sessionToken,
      });
    } else {
      // Fake backend (default)
      response = postFakeOtpResend({
        sessionToken,
      });
    }

    const data = await response;

    if (data) {
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        const finalData: any = JSON.parse(JSON.stringify(data));
        if (finalData.status === "success") {
          dispatch(otpResent());
        } else {
          dispatch(otpError(finalData.message || "Failed to resend OTP"));
        }
      } else {
        dispatch(otpResent());
      }
    }
  } catch (error: any) {
    dispatch(otpError(error.message || "Failed to resend OTP"));
  }
};
