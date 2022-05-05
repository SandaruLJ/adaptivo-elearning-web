import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import courseSlice from "./course-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    course: courseSlice.reducer,
  },
});

export default store;
