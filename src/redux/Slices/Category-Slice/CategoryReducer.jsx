import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../Constants";

export const getPopularCategories = createAsyncThunk(
  "/getpopularcategories",
  async (_, { rejectwithvalue }) => {
    try {
      const response = await axios.get(
        `${APILINK}/api/Category/getPopularCategories`
      );
      return response.data;
    } catch (err) {
      rejectwithvalue(err);
    }
  }
);
export const getAllCategories = createAsyncThunk(
  "/getallcategories",
  async (_, { rejectwithvalue }) => {
    try {
      const response = await axios.get(`${APILINK}/api/Category/getAllCategories`);
      return response.data;
    } catch (err) {
      rejectwithvalue(err);
    }
  }
);
const categoriesSlice = createSlice({
  name: "category",
  initialState: {
    popularcategory: [],
    allcategories: [],
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      //get popular Categories
      .addCase(getPopularCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.popularcategory = action.payload;
      })
      .addCase(getPopularCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get all catgories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allcategories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default categoriesSlice.reducer;
