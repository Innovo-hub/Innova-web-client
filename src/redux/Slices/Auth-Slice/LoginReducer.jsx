import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, {  rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${APILINK}/api/Account/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { Token } = response.data;
      // Save token in localStorage
      localStorage.setItem("accessToken", Token);
      return { Token};
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "An error occurred" }
      );
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      return "Logout successful";
    } catch (error) {
      console.error("Logout Error:", error);
      return rejectWithValue("Logout failed");
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    token: localStorage.getItem("accessToken") || null,
    error: null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.Token; // Update state with the token
        state.isAuthenticated = true; // Mark user as authenticated
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture the error message
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false; // Mark user as not authenticated
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
