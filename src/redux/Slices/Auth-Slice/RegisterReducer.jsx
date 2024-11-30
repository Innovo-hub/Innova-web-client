import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "./../../../../Constants";

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // console.log(userData);

      const response = await axios.post(
        `${APILINK}/api/Account/register`,
        userData
      );
      // console.log(response);

      return response.data; // On success, pass the data
    } catch (error) {
      // Extract only the useful information
      // console.log("Error had happened", error);

      const serializedError = {
        message: error.response?.data?.message || "Something went wrong",
        status: error.response?.status,
        headers: error.response?.headers || {},
      };
      return rejectWithValue(serializedError); // Pass the sanitized error object
    }
  }
);


// Intailize the Slice Also set the cases for each condition ("Pending , Accepted , Rejected ")
const registerSlice = createSlice({
  name: "registerslice",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        // if the method is pending "Async - await"
        (state.loading = true), (state.error = null);
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        // If the response with a status code 200
        (state.loading = false), (state.user = action.payload);
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        // Rejected Response with an error
        (state.loading = false), (state.error = action.payload);
      });
  },
});
export default registerSlice.reducer;
