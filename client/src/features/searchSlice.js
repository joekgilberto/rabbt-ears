//Imports thunk and slice tools from Redux toolkit and custom tvmaze services API tools
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-services';

//Creates an async thunk to call a list of shows based on a passed through query
export const loadResults = createAsyncThunk(
  'search/loadResults',
  async (query) => {
    const res = await tvmazeServices.searchShow(query);
    return res;
  }
);

//Creates and searchSlice with results, isLoading, and error state, along with its reducers
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

//Exports state, actions, and reducer
export const selectResults = (state) => state.search.results;

export const isLoading = (state) => state.search.isLoadingResults;

export const hasError = (state) => state.search.hasResultsError;

export default searchSlice.reducer;