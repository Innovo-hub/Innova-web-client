import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";
import Swal from "sweetalert2";

export const publishProduct = createAsyncThunk(
  "productCard/publishProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(`${APILINK}/api/Product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        text: "Product published successfully",
        icon: "success",
      });
      return response.data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Error publishing product",
        icon: "error",
      });
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPopularRecommendations = createAsyncThunk(
  "productCard/fetchPopularRecommendations",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token:", token);
      console.log("API URL:", `${APILINK}/api/recommendations/popular?count=4`);

      const response = await axios.get(
        `${APILINK}/api/recommendations/popular?count=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response || error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "productCard",
  initialState: {
    product: null,
    popularRecommendations: [],
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
      })
      .addCase(fetchPopularRecommendations.pending, (state) => {
        console.log("Fetching recommendations...");
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPopularRecommendations.fulfilled, (state, action) => {
        console.log("Recommendations fetched successfully:", action.payload);
        state.status = "succeeded";
        state.popularRecommendations = action.payload;
        state.error = null;
      })
      .addCase(fetchPopularRecommendations.rejected, (state, action) => {
        console.error("Failed to fetch recommendations:", action.payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
