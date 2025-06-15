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
      console.log("Fetching all deals...");
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        return rejectWithValue("No access token found");
      }

      const response = await axios.get(`${BASE_URL}/GetAllDeals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Raw API Response:", response);
      console.log("Deals API Response Data:", response.data);

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      // If response.data has a nested data property containing the deals
      else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      // If response.data has a different structure
      else if (response.data) {
        console.log("Unexpected data structure:", response.data);
        return response.data;
      } else {
        console.error("Invalid response structure");
        return rejectWithValue("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching all deals:", error);
      console.error("Error response:", error.response);
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

// ✅ Get Owner Deals
export const fetchOwnerDeals = createAsyncThunk(
  "deals/fetchOwnerDeals",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${BASE_URL}/owner-deals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Get Investor Deals
export const fetchInvestorDeals = createAsyncThunk(
  "deals/fetchInvestorDeals",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${BASE_URL}/investor-deals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
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
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  allDeals: [],
  ownerDeals: [],
  investorDeals: [],
  selectedDeal: null,
  loading: {
    all: false,
    owner: false,
    investor: false,
    selected: false,
    add: false,
  },
  error: {
    all: null,
    owner: null,
    investor: null,
    selected: null,
    add: null,
  },
};

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    clearSelectedDeal: (state) => {
      state.selectedDeal = null;
    },
    clearErrors: (state) => {
      state.error = {
        all: null,
        owner: null,
        investor: null,
        selected: null,
        add: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle All Deals
      .addCase(fetchAllDeals.pending, (state) => {
        console.log("Deals loading state: pending");
        state.loading.all = true;
        state.error.all = null;
      })
      .addCase(fetchAllDeals.fulfilled, (state, action) => {
        console.log("Deals loading state: fulfilled", action.payload);
        state.loading.all = false;
        state.allDeals = action.payload;
      })
      .addCase(fetchAllDeals.rejected, (state, action) => {
        console.log("Deals loading state: rejected", action.payload);
        state.loading.all = false;
        state.error.all = action.payload;
      })

      // Handle Owner Deals
      .addCase(fetchOwnerDeals.pending, (state) => {
        state.loading.owner = true;
        state.error.owner = null;
      })
      .addCase(fetchOwnerDeals.fulfilled, (state, action) => {
        state.loading.owner = false;
        state.ownerDeals = action.payload;
      })
      .addCase(fetchOwnerDeals.rejected, (state, action) => {
        state.loading.owner = false;
        state.error.owner = action.payload;
      })

      // Handle Investor Deals
      .addCase(fetchInvestorDeals.pending, (state) => {
        state.loading.investor = true;
        state.error.investor = null;
      })
      .addCase(fetchInvestorDeals.fulfilled, (state, action) => {
        state.loading.investor = false;
        state.investorDeals = action.payload;
      })
      .addCase(fetchInvestorDeals.rejected, (state, action) => {
        state.loading.investor = false;
        state.error.investor = action.payload;
      })

      // Handle Selected Deal
      .addCase(fetchDealById.pending, (state) => {
        state.loading.selected = true;
        state.error.selected = null;
      })
      .addCase(fetchDealById.fulfilled, (state, action) => {
        state.loading.selected = false;
        state.selectedDeal = action.payload;
      })
      .addCase(fetchDealById.rejected, (state, action) => {
        state.loading.selected = false;
        state.error.selected = action.payload;
      })

      // Handle Add Deal
      .addCase(addDeal.pending, (state) => {
        state.loading.add = true;
        state.error.add = null;
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        state.loading.add = false;
        state.allDeals.push(action.payload);
        Swal.fire("Success", "Deal added successfully", "success");
      })
      .addCase(addDeal.rejected, (state, action) => {
        state.loading.add = false;
        state.error.add = action.payload;
        Swal.fire("Error", "Failed to add deal", "error");
      });
  },
});

export const { clearSelectedDeal, clearErrors } = dealsSlice.actions;
export default dealsSlice.reducer;
