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
      return { categoryId, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch products");
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "product/getOneProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APILINK}/api/Product/getOneProduct/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch product");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    productsByCategory: {}, // Store products by categoryId
    product: {},
    productLoading: false,
    productError: null,
    categoryLoading: false,
    categoryError: null,
  },
  extraReducers: (builder) => {
    builder
      // Handle getOneProduct
      .addCase(getOneProduct.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.payload;
      })

      // Handle getProductByCategory
      .addCase(getProductByCategory.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        const { categoryId, data } = action.payload;
        state.productsByCategory[categoryId] = data;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload;
      });
  },
});

export default productSlice.reducer;
