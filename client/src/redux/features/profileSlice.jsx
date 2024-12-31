import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  full_name: "",
  email: "",
  phone: "",
  role: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
    },
    clearUserInfo: (state) => {
      state = initialState;
    },
  },
});

export const { updateUserInfo, clearUserInfo } = profileSlice.actions;

export default profileSlice.reducer;
