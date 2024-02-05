//Imports thunk and slice tools from Redux toolkit and custom review and tvmaze services API tools
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/review/review-services';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-services';

//Creates an async thunk to call all reviews and then updates the state with the response
export const loadFeedReviews = createAsyncThunk(
    'feed/loadFeedReviews',
    async () => {
        return await reviewServices.getAllReviews();
    }
);

//Creates an async thunk to call random shows and then updates the state with the response
export const loadFeedShows = createAsyncThunk(
    'feed/loadFeedShows',
    async () => {
        return await tvmazeServices.getRandomShows();
    }
);

//Creates and feedSlice with reviews, shows, isLoading, and error state, along with its reducers
export const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        reviews: [],
        shows: [],
        isLoadingReviews: false,
        hasReviewsError: false,
        isLoadingShows: false,
        hasShowsError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFeedReviews.pending, (state) => {
                state.isLoadingReviews = true;
                state.hasReviewsError = false;
            })
            .addCase(loadFeedReviews.fulfilled, (state, action) => {
                state.isLoadingReviews = false;
                state.reviews = action.payload;
            })
            .addCase(loadFeedReviews.rejected, (state) => {
                state.isLoadingReviews = false;
                state.hasReviewsError = true;
                state.reviews = [];
            })

            .addCase(loadFeedShows.pending, (state) => {
                state.isLoadingShows = true;
                state.hasShowsError = false;
            })
            .addCase(loadFeedShows.fulfilled, (state, action) => {
                state.isLoadingShows = false;
                state.shows = action.payload;
            })
            .addCase(loadFeedShows.rejected, (state) => {
                state.isLoadingShows = false;
                state.hasShowsError = true;
                state.shows = [];
            })
    },
});

//Exports state, actions, and reducer
export const selectReviews = (state) => state.feed.reviews;

export const selectShows = (state) => state.feed.shows;

export const isLoadingReviews = (state) => state.feed.isLoadingReviews;

export const hasReviewsError = (state) => state.feed.hasReviewsError;

export const isLoadingShows = (state) => state.feed.isLoadingShows;

export const hasShowsError = (state) => state.feed.hasShowsError;

export default feedSlice.reducer;