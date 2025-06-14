import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

export const getUserWishlist = createAsyncThunk(
  "/get/wishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${APILINK}/api/Wishlist/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "An Error Has Happned");
    }
  }
);
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (ProductId, { rejectWithValue }) => {
    try {
      console.log("From Reducer", ProductId);

      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${APILINK}/api/Wishlist/addProductToWishlist/${ProductId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Return custom error message if available
      return rejectWithValue(
        error.message || "An error occurred while adding to wishlist."
      );
    }
  }
);
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ ProductId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `${APILINK}/api/Wishlist/remove/${ProductId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Return custom error message if available
      return rejectWithValue(
        error.message || "An error occurred while removing from wishlist."
      );
    }
  }
);
const initialState = {
  wishlist: [],
  count: 0,
  loading: false,
  error: null,
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.Wishlist;
        state.count = state.wishlist.length;
        localStorage.setItem("wishlistCount", state.count);
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
