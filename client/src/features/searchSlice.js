import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState:{
    results: []
  },
  reducers: {
    addResults(state, action) {
      state.results = action.payload;
    }
  }
})

export const selectResults = (state) => state.search.results;

export const { addResults } = searchSlice.actions

export default searchSlice.reducer