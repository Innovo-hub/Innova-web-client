import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";
const API_URL = `${APILINK}/api/Product`;
export const publishProduct = createAsyncThunk(
  "product/publishProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === "otherPictures") {
          productData.otherPictures.forEach((file, index) => {
            formData.append(`otherPictures[${index}]`, file);
          });
        } else {
          formData.append(key, productData[key]);
        }
      });
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
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
        state.product = action.payload;
      })
      .addCase(publishProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
