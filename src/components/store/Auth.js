import { createSlice } from "@reduxjs/toolkit";

const localToken = !! localStorage.getItem('token')

const initialAuthState = {
  isLogin: localToken,
  token:localToken
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
        state.isLogin=true
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
