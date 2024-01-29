import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as reviewsServices from '../utilities/reviews/reviews-service';

const initReview = {
    rating: 0,
    review: '',
    title: '',
    poster: '',
    showId: 0,
    finished: false,
    fav: false,
    tags: [],
    username: '',
    owner: ''
}

export const loadReview = createAsyncThunk(
    'editReview/loadReview',
    async (id) => {
        const data = await reviewsServices.getReview(id);
        return data;
    }
);

const editReviewSlice = createSlice({
    name: 'editReview',
    initialState: {
        editReview: initReview,
        isLoadingReview: false,
        hasReviewError: false
    },
    reducers: {
        updateEditReview(state, action) {
            state.editReview = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadReview.pending, (state) => {
                state.isLoadingReview = true;
                state.hasReviewError = false;
            })
            .addCase(loadReview.fulfilled, (state, action) => {
                state.isLoadingReview = false;
                state.editReview = action.payload;
            })
            .addCase(loadReview.rejected, (state) => {
                state.isLoadingReview = false;
                state.hasReviewError = true;
                state.editReview = initReview;
            })
    },
})

export const selectEditReview = (state) => state.editReview.editReview;

export const { updateEditReview } = editReviewSlice.actions

export const isLoading = (state) => state.editReview.isLoadingReview;

export const hasError = (state) => state.editReview.hasReviewError;

export default editReviewSlice.reducer;