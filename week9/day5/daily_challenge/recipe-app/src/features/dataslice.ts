import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchRecipes } from "../api/api";
import { Recipe } from "../types/types";

interface DataState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState<Recipe> = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk for fetching recipes
export const getRecipes = createAsyncThunk("data/getRecipes", async () => {
  const recipes = await fetchRecipes();
  return recipes;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default dataSlice.reducer;



