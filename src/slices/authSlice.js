import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userId: "",
    courseId: ""
  },
  reducers: {
    changeIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
    },
    courseID(state, action) {
      state.courseId = action.payload.courseId;
    }
  }
});

export const { changeIsLoggedIn, courseID } = authSlice.actions;

export default authSlice.reducer;
