import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

const API_URL = `${APILINK}/api/Cart/add`;

// **Thunk لإضافة المنتج إلى السلة**
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, {
        productId: product.id,
        quantity: 1,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add to cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const existingItem = state.cartItems.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.cartItems.push({ ...action.payload, quantity: 1 });
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
