import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-service';
import * as reviewServices from '../utilities/reviews/reviews-service';

export const loadShow = createAsyncThunk(
    'show/loadShow',
    async (id) => {
        const data = { show: {}, reviews: [] };
        return await tvmazeServices.getShow(id).then(async (showRes) => {
            data.show = showRes;
            return await reviewServices.getAssociated(id).then((reviewRes) => {
                data.reviews = reviewRes;
                return data
            })
        })
    }
);

export const showSlice = createSlice({
    name: 'show',
    initialState: {
        show: {},
        reviews: [],
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
                state.show = action.payload.show;
                state.reviews = action.payload.reviews;
            })
            .addCase(loadShow.rejected, (state) => {
                state.isLoadingShow = false;
                state.hasShowError = true;
                state.show = {};
                state.reviews = [];
            })
    },
});

export const selectShow = (state) => state.show.show;

export const selectReviews = (state) => state.show.reviews;

export const isLoading = (state) => state.show.isLoadingShow;

export const hasError = (state) => state.show.hasShowError;

export default showSlice.reducer;