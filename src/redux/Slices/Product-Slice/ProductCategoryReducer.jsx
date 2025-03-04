import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "./../../../../Constants";

export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${APILINK}/api/Category/getProductsByCategory/${categoryId}`
      );
      return { categoryId, data: response.data }; // Return both categoryId and data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch products");
    }
  }
);
export const getOneProduct = createAsyncThunk(
  "/getoneproduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APILINK}/api/Product/getOneProduct/${id}`);
      return response.data
    } catch (error) {
      rejectWithValue(error);
    }
  }
)
const productSlice = createSlice({
  name: "product",
  initialState: {
    productsByCategory: {}, // Store products by categoryId
    product: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { categoryId, data } = action.payload;
        state.productsByCategory[categoryId] = data; // Store data by categoryId
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default productSlice.reducer;