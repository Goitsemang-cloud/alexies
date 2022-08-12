import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/counterUserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
