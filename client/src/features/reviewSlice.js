import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/reviews/reviews-service';

export const loadReview = createAsyncThunk(
    'review/loadReview',
    async (id) => {
        const res = await reviewServices.getReview(id);
        return res;
    }
);

export const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        review: {},
        isLoadingReview: false,
        hasReviewError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadReview.pending, (state) => {
                state.isLoadingReview = true;
                state.hasReviewError = false;
            })
            .addCase(loadReview.fulfilled, (state, action) => {
                state.isLoadingReview = false;
                state.review = action.payload;
            })
            .addCase(loadReview.rejected, (state) => {
                state.isLoadingReview = false;
                state.hasReviewError = true;
                state.review = {};
            })
    },
});

export const selectReview = (state) => state.review.review;

export const isLoading = (state) => state.review.isLoadingReview;

export const hasError = (state) => state.review.hasReviewError;

export default reviewSlice.reducer;