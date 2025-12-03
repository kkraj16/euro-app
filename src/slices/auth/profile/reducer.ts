import { createSlice } from "@reduxjs/toolkit";

// Restore user profile from localStorage on app load
const getStoredProfile = () => {
  try {
    const authUser =
      localStorage.getItem("authUser") || sessionStorage.getItem("authUser");
    return authUser ? JSON.parse(authUser) : {};
  } catch (error) {
    return {};
  }
};

export const initialState = {
  error: "",
  success: "",
  user: getStoredProfile(),
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    profileSuccess(state, action) {
      state.success = action.payload.status;
      state.user = action.payload.data;
    },
    profileError(state, action) {
      state.error = action.payload;
    },
    editProfileChange(state) {
      state = { ...state };
    },
    resetProfileFlagChange(state: any) {
      state.success = null;
    },
  },
});

export const {
  profileSuccess,
  profileError,
  editProfileChange,
  resetProfileFlagChange,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
