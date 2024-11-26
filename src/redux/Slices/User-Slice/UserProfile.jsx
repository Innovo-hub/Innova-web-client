import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

export const getUserProfile = createAsyncThunk(
  "userprofile/fetch",
  async ({token}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APILINK}/api/Profile/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });
      console.log("From REducer", response);
      
      // Return the response data to be stored in the state
      return response.data;
    } catch (err) {
      // Reject with the error response or a custom error message
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);

const userProfileSlice = createSlice({
    name: "userprofile",
    initialState: {
      profile: null, // User profile data
      loading: false, // Loading state
      error: null, // Error message
    },
    reducers: {}, // Add any additional reducers here
    extraReducers: (builder) => {
      builder
        .addCase(getUserProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.profile = action.payload; // Store the profile data in the state
        })
        .addCase(getUserProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload; // Store the error message in the state
        });
    },
  });
  
  export default userProfileSlice.reducer;