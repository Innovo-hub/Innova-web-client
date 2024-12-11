import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
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
      const { token } = response.data;

      // Save tokens in localStorage
      localStorage.setItem("accessToken", token);

      // Return the token to be used as the action's payload
      return { token };
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
      localStorage.removeItem("refreshToken");
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
    roleName : null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("From reducrer "+JSON.stringify(action.payload));
        
        state.loading = false;
        state.token = action.payload.token; // Update state with the token
        state.roleName = action.payload.roleName;
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
