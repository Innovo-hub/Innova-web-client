import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";
import Swal from "sweetalert2";

const BASE_URL = `${APILINK}/api/Deals`;

// ✅ Get All Deals
export const fetchAllDeals = createAsyncThunk("deals/fetchAll", async () => {
  const response = await axios.get(`${BASE_URL}/GetAllDeals`);
  return response.data;
});

// ✅ Get Deal By ID
export const fetchDealById = createAsyncThunk("deals/fetchById", async (id) => {
  const response = await axios.get(`${BASE_URL}/GetDealById/${id}`);
  return response.data;
});

// ✅ Get Deals for Specific Business Owner
export const fetchDealsByOwner = createAsyncThunk(
  "deals/fetchByOwner",
  async (ownerId) => {
    const response = await axios.get(
      `${BASE_URL}/GetAllDealsForSpecificBusinessOwner/${ownerId}`
    );
    return response.data;
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
        text: "Deal added successfully",
        icon: "success",
      });

      return response.data;
    } catch (error) {
      console.error(error);
      Swal.fire({
        text: "Error adding deal",
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
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get All Deals
      .addCase(fetchAllDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDeals = action.payload;
      })
      .addCase(fetchAllDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Get Deal By ID
      .addCase(fetchDealById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDealById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealDetails = action.payload;
      })
      .addCase(fetchDealById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Get Deals by Owner
      .addCase(fetchDealsByOwner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDealsByOwner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ownerDeals = action.payload;
      })
      .addCase(fetchDealsByOwner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add Deal
      .addCase(addDeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDeals.push(action.payload); // optional
      })
      .addCase(addDeal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default dealsSlice.reducer;
