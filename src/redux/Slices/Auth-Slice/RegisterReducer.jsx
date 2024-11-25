import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APILINK from "./../../../../Constants";
import axios from "axios";

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      // console.log("Data from AuthReducer", formData);
      const response = await axios.post(
        `${APILINK}/api/Account/register`, //Main API link is on a external file
        formData, // The data that will be sent to the server "Check the postman collection for that data"
        {
          headers: {
            "Content-Type": "application/json", // the content type that will be sent to the server
          },
        }
      );
      return response.data; // Return the API response
    } catch (error) {
      return rejectWithValue(error.response); // Handle error and reject with value
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
