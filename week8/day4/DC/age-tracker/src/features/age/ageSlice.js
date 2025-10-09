import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks
export const ageUpAsync = createAsyncThunk('age/ageUpAsync', async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
  return 1;
});

export const ageDownAsync = createAsyncThunk('age/ageDownAsync', async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
  return -1;
});

// Slice
const ageSlice = createSlice({
  name: 'age',
  initialState: {
    value: 20,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.value += action.payload;
        state.loading = false;
      })
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.value += action.payload;
        state.loading = false;
      });
  },
});

export default ageSlice.reducer;
