import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

export const publishProduct = createAsyncThunk(
  "product/publishProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${APILINK}/api/Product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(publishProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(publishProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.product = action.payload;
      })
      .addCase(publishProduct.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload);
        
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
