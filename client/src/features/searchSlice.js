import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-service';

export const loadResults = createAsyncThunk(
  'search/loadResults',
  async (query) => {
    const data = { results: [], searchTerm: '' }
    let params = query.split('+');
    data.searchTerm = params[0];
    const queries = [...params[1].split(',')];
    return await tvmazeServices.getShowList(queries).then((res) => {
      data.results = res;
      return data;
    })
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
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
        state.searchTerm = action.payload.searchTerm;
        state.results = action.payload.results;
      })
      .addCase(loadResults.rejected, (state) => {
        state.isLoadingResults = false;
        state.hasResultsError = true;
        state.searchSlice = '';
        state.results = [];
      })
  },
});

export const selectSearchTerm = (state) => state.search.searchTerm;

export const selectResults = (state) => state.search.results;

export const isLoading = (state) => state.search.isLoadingResults;

export const hasError = (state) => state.search.hasResultsError;

export default searchSlice.reducer;