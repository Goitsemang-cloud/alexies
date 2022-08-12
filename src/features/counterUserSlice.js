import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    update: (state, action) => {
      state.user = action.payload;
    },
    reset: (state) => {
      state.user = null;
    },
  },
});

export const { update, reset } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
