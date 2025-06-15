import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants.js";

export const getUserProfile = createAsyncThunk(
  "userprofile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${APILINK}/api/Profile/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching user profile:", err); // Debug
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);

export const uploadIdCard = createAsyncThunk(
  "userprofile/uploadIdCard",
  async ({ frontImage, backImage }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("frontImage", frontImage);
      formData.append("backImage", backImage);

      const response = await axios.post(
        `${APILINK}/api/Profile/upload-id-card`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to upload ID card" }
      );
    }
  }
);

export const uploadSignature = createAsyncThunk(
  "userprofile/uploadSignature",
  async (signatureImage, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("SignatureImage", signatureImage);

      const response = await axios.post(
        `${APILINK}/api/Signature/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to upload signature" }
      );
    }
  }
);

export const fetchSignature = createAsyncThunk(
  "userprofile/fetchSignature",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${APILINK}/api/Signature`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch signature" }
      );
    }
  }
);

export const deleteSignature = createAsyncThunk(
  "userprofile/deleteSignature",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `${APILINK}/api/Signature/delete-signature`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to delete signature" }
      );
    }
  }
);

export const connectStripeAccount = createAsyncThunk(
  "userprofile/connectStripeAccount",
  async (platform, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${APILINK}/api/Payment/connect-stripe-account`,
        { Platform: platform },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to connect Stripe account" }
      );
    }
  }
);

export const predictSales = createAsyncThunk(
  "userprofile/predictSales",
  async (predictionData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${APILINK}/api/Recommendations/predict-sales`,
        predictionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to get prediction" }
      );
    }
  }
);

const userProfileSlice = createSlice({
  name: "userprofile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    idCardUploadStatus: null,
    signature: null,
    signatureStatus: null,
    stripeConnectionStatus: null,
    prediction: {
      result: null,
      loading: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        console.log("Redux updated with:", action.payload); // Debug
        state.loading = false;
        state.profile = action.payload; // ✅ Ensure profile is updated
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        console.error("Redux Error:", action.payload); // Debug
        state.loading = false;
        state.error = action.payload;
      })
      // ID Card Upload cases
      .addCase(uploadIdCard.pending, (state) => {
        state.idCardUploadStatus = "loading";
      })
      .addCase(uploadIdCard.fulfilled, (state) => {
        state.idCardUploadStatus = "success";
      })
      .addCase(uploadIdCard.rejected, (state, action) => {
        state.idCardUploadStatus = "error";
        state.error = action.payload;
      })
      // Signature Upload cases
      .addCase(uploadSignature.pending, (state) => {
        state.signatureStatus = "loading";
      })
      .addCase(uploadSignature.fulfilled, (state, action) => {
        state.signatureStatus = "success";
        state.signature = action.payload;
      })
      .addCase(uploadSignature.rejected, (state, action) => {
        state.signatureStatus = "error";
        state.error = action.payload;
      })
      // Signature Fetch cases
      .addCase(fetchSignature.pending, (state) => {
        state.signatureStatus = "loading";
      })
      .addCase(fetchSignature.fulfilled, (state, action) => {
        state.signatureStatus = "success";
        state.signature = action.payload;
      })
      .addCase(fetchSignature.rejected, (state, action) => {
        state.signatureStatus = "error";
        state.error = action.payload;
      })
      // Signature Delete cases
      .addCase(deleteSignature.pending, (state) => {
        state.signatureStatus = "loading";
      })
      .addCase(deleteSignature.fulfilled, (state) => {
        state.signatureStatus = "success";
        state.signature = null;
      })
      .addCase(deleteSignature.rejected, (state, action) => {
        state.signatureStatus = "error";
        state.error = action.payload;
      })
      // Stripe Connection cases
      .addCase(connectStripeAccount.pending, (state) => {
        state.stripeConnectionStatus = "loading";
      })
      .addCase(connectStripeAccount.fulfilled, (state) => {
        state.stripeConnectionStatus = "success";
      })
      .addCase(connectStripeAccount.rejected, (state, action) => {
        state.stripeConnectionStatus = "error";
        state.error = action.payload;
      })
      // Prediction cases
      .addCase(predictSales.pending, (state) => {
        state.prediction.loading = true;
        state.prediction.error = null;
      })
      .addCase(predictSales.fulfilled, (state, action) => {
        state.prediction.loading = false;
        state.prediction.result = action.payload;
      })
      .addCase(predictSales.rejected, (state, action) => {
        state.prediction.loading = false;
        state.prediction.error = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
