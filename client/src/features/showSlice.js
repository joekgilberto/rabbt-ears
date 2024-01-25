//Imports createAsyncThunk and createSlice from Redux's toolkit, and hurricaneServices from hurricane-service for API calls
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-service';

export const loadShow = createAsyncThunk(
    'show/loadShow',
    async (id) => {
        const res = await tvmazeServices.getShow(id);
        return res;
    }
);

export const showSlice = createSlice({
    name: 'show',
    initialState: {
        show: {},
        isLoadingShow: false,
        hasShowError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadShow.pending, (state) => {
                state.isLoadingShow = true;
                state.hasShowError = false;
            })
            .addCase(loadShow.fulfilled, (state, action) => {
                state.isLoadingShow = false;
                state.show = action.payload;
            })
            .addCase(loadShow.rejected, (state) => {
                state.isLoadingShow = false;
                state.hasShowError = true;
                state.show = {};
            })
    },
});

export const selectShow = (state) => state.show.show;

export const isLoading = (state) => state.show.isLoadingShow;

export const hasError = (state) => state.show.hasShowError;

export default showSlice.reducer;