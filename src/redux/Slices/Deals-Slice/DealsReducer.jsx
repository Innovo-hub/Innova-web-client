import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";
import Swal from "sweetalert2";

const BASE_URL = `${APILINK}/api/Deals`;

// ✅ Get All Deals
export const fetchAllDeals = createAsyncThunk(
  "deals/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/GetAllDeals`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all deals:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Get Deal By ID
export const fetchDealById = createAsyncThunk(
  "deals/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/GetDealById/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching deal with ID ${id}:`, error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Get Deals for Specific Business Owner
export const fetchDealsByOwner = createAsyncThunk(
  "deals/fetchByOwner",
  async (ownerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/GetAllDealsForSpecificBusinessOwner/${ownerId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching deals for owner ${ownerId}:`, error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Add a new Deal with Swal alert
export const addDeal = createAsyncThunk(
  "deals/addDeal",
  async (dealData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(`${BASE_URL}/add`, dealData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Deal added successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      return response.data;
    } catch (error) {
      console.error("Error adding deal:", error);

      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Error adding deal",
        icon: "error",
      });

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState: {
    allDeals: [],
    dealDetails: null,
    ownerDeals: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetDealStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Deals
      .addCase(fetchAllDeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDeals = action.payload;
      })
      .addCase(fetchAllDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Get Deal By ID
      .addCase(fetchDealById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDealById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealDetails = action.payload;
      })
      .addCase(fetchDealById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Get Deals by Owner
      .addCase(fetchDealsByOwner.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDealsByOwner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ownerDeals = action.payload;
      })
      .addCase(fetchDealsByOwner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Add Deal
      .addCase(addDeal.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the new deal to the allDeals array
        if (action.payload) {
          state.allDeals.unshift(action.payload); // Add to beginning of array
        }
      })
      .addCase(addDeal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetDealStatus } = dealsSlice.actions;
export default dealsSlice.reducer;
