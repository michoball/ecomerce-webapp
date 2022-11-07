import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const CATEGORIES_INITIAL_STATE = {
  categoriesMap: [],
  isLoading: false,
  error: null,
};

export const fetchCategoriseMap = createAsyncThunk(
  "category/get",
  async (thunkAPI) => {
    try {
      return await getCategoriesAndDocuments();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriseMap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoriseMap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoriesMap = action.payload;
      })
      .addCase(fetchCategoriseMap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
