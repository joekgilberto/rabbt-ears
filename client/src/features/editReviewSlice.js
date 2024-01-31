//Imports thunk and slice tools from Redux toolkit and custom review services API tools
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as reviewServices from '../utilities/review/review-services';

//Defines initial state of reviews
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

//Creates an async thunk to call a review and updates the state with the response
export const loadReview = createAsyncThunk(
    'editReview/loadReview',
    async (id) => {
        const res = await reviewServices.getReview(id);
        return res;
    }
);

//Creates and editReviewSlice with review, isLoading, and error state, along with its reducers
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

//Exports state, actions, and reducer
export const selectEditReview = (state) => state.editReview.editReview;

export const { updateEditReview } = editReviewSlice.actions

export const isLoading = (state) => state.editReview.isLoadingReview;

export const hasError = (state) => state.editReview.hasReviewError;

export default editReviewSlice.reducer;