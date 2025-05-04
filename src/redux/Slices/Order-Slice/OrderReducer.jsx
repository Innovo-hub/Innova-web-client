import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

export const getUserOrders = createAsyncThunk('/get/orders', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${APILINK}/api/Profile/getOrders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message || "An Error Has Happned");
    }
});
const initialState = {
    userOrders : [],
    loading: false,
    error: null,
}
const OrderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.userOrders = action.payload;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default OrderSlice.reducer;