import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "./../../../../Constants";
export const RgisterWithGoogle = createAsyncThunk(
    "auth/registerWithGoogle",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${APILINK}/api/Account/google-response`);
        if (response.data?.redirectUrl) {
          // Redirect user to Google OAuth
          console.log("redirecting......");
          
          window.location.href = response.data.redirectUrl;
        }
        return response.data;
      } catch (error) {
        return rejectWithValue({
          message: error.response?.data?.message || "Failed to initiate Google login",
          status: error.response?.status,
        });
      }
    }
  );
const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    email: null,
    roleName: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.roleName = action.payload.roleName;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.userId = null;
      state.email = null;
      state.roleName = null;
      state.token = null;
    },
  },
});


export default userSlice.reducer;
