import { createSlice } from "@reduxjs/toolkit";

// Restore user from localStorage on app load
const getStoredUser = () => {
  try {
    const authUser =
      localStorage.getItem("authUser") || sessionStorage.getItem("authUser");
    return authUser ? JSON.parse(authUser) : {};
  } catch (error) {
    return {};
  }
};

export const initialState: any = {
  user: getStoredUser(),
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state: any, action: any) {
      state.error = action.payload.data;
      state.loading = true;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true;
      state.user = {};
    },
    reset_login_flag(state: any) {
      state.error = null;
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const { apiError, loginSuccess, logoutUserSuccess, reset_login_flag } =
  loginSlice.actions;

export default loginSlice.reducer;
