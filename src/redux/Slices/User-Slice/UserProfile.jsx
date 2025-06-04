import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants.js";

export const getUserProfile = createAsyncThunk(
  "userprofile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${APILINK}/api/Profile/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    } catch (err) {
      console.error("Error fetching profile:", err); // Debug errors
      return rejectWithValue(err.response?.data || { message: "Failed to fetch profile" });
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
        console.log("Redux updated with:", action.payload); // Debug
        state.loading = false;
        state.profile = action.payload; // ✅ Ensure profile is updated
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        console.error("Redux Error:", action.payload); // Debug
        state.loading = false;
        state.error = action.payload;
      });
  }

});

export default userProfileSlice.reducer;
