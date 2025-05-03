import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

export const addToCart = createAsyncThunk(
    'cart/add',
    async ({ ProductId, Quantity }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `${APILINK}/api/Cart/add`,
                { ProductId, Quantity }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            return response.data;
        } catch (error) {
            // Return custom error message if available
            return rejectWithValue(error.Message || "An error occurred while adding to cart.");
        }
    }
);
export const getCartProducts = createAsyncThunk(
    '/getcart',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${APILINK}/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data.message || "Error Just happend");
        }
    }
)
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        cartProducts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //get Cart Products
            .addCase(getCartProducts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.cartProducts = action.payload.cartItems;
            })
            .addCase(getCartProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default cartSlice.reducer;