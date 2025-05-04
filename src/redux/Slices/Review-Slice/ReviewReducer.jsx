import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

// إرسال تقييم وتعليق جديد على منتج
export const addReview = createAsyncThunk(
  "/product/rate-comment",
  async ({ ProductId, RatingValue, Comment }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${APILINK}/api/Product/rateAndComment`,
        { ProductId, RatingValue, Comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "حدث خطأ أثناء إرسال التقييم");
    }
  }
);

// الحصول على تقييمات منتج معين
export const getProductReviews = createAsyncThunk(
  "/product/get-reviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${APILINK}/api/Product/getProductReviews/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "حدث خطأ أثناء جلب التقييمات");
    }
  }
);

// الحصول على كل تعليقات وتقييمات المنتج
export const getAllProductComments = createAsyncThunk(
  "/product/get-all-comments",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${APILINK}/api/Product/GetAllProductComments/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "حدث خطأ أثناء جلب التعليقات والتقييمات"
      );
    }
  }
);

const initialState = {
  reviews: [],
  comments: [],
  numOfComments: 0,
  averageRating: 0,
  ratingBreakdown: {},
  loading: false,
  error: null,
  submitLoading: false,
  submitError: null,
  submitSuccess: false,
  commentsLoading: false,
  commentsError: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewState: (state) => {
      state.submitSuccess = false;
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // حالات إضافة تقييم
      .addCase(addReview.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;
        state.submitSuccess = false;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.submitLoading = false;
        state.submitSuccess = true;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError = action.payload;
      })
      // حالات جلب التقييمات
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حالات جلب جميع التعليقات والتقييمات
      .addCase(getAllProductComments.pending, (state) => {
        state.commentsLoading = true;
        state.commentsError = null;
      })
      .addCase(getAllProductComments.fulfilled, (state, action) => {
        state.commentsLoading = false;
        state.comments = action.payload.Comments;
        state.numOfComments = action.payload.NumOfComments;
        state.averageRating = action.payload.AverageRating;
        state.ratingBreakdown = action.payload.RatingBreakdown;
      })
      .addCase(getAllProductComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.commentsError = action.payload;
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
