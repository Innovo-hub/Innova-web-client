import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

export const getUserProfile = createAsyncThunk(
  "userprofile/fetch",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APILINK}/api/Profile/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);

const userProfileSlice = createSlice({
  name: "userprofile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // Store the profile data
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
