import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    username: "",
    fullName: "",
    email: "",
    phone: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    clearUserInfo: (state) => {
      state.userInfo = initialState.userInfo;
    },
  },
});

export const { updateUserInfo, clearUserInfo } = profileSlice.actions;

export default profileSlice.reducer;
