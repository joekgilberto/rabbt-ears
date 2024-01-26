import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-service';

export const loadResults = createAsyncThunk(
  'search/loadResults',
  async (query) => {
    const queries = query.split(',');
    const data = await tvmazeServices.getShowList(queries);
    return data;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    isLoadingResults: false,
    hasResultsError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadResults.pending, (state) => {
        state.isLoadingResults = true;
        state.hasResultsError = false;
      })
      .addCase(loadResults.fulfilled, (state, action) => {
        state.isLoadingResults = false;
        state.results = action.payload;
      })
      .addCase(loadResults.rejected, (state) => {
        state.isLoadingResults = false;
        state.hasResultsError = true;
        state.results = [];
      })
  },
});

export const selectResults = (state) => state.search.results;

export const isLoading = (state) => state.search.isLoadingResults;

export const hasError = (state) => state.search.hasResultsError;

export default searchSlice.reducer;