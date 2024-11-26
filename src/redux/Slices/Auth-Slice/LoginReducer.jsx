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
        console.log("Fulfilled action:", action);

        state.loading = false;
        state.token = action.payload.token; // Update state with the token
        state.isAuthenticated = true; // Mark user as authenticated
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture the error message
      });
  },
});
export default loginSlice.reducer;
