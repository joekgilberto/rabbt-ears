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
        isLoadingFeed: false,
        hasFeedError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFeedReviews.pending, (state) => {
                state.isLoadingFeed = true;
                state.hasFeedError = false;
            })
            .addCase(loadFeedReviews.fulfilled, (state, action) => {
                state.isLoadingFeed = false;
                state.reviews = action.payload;
            })
            .addCase(loadFeedReviews.rejected, (state) => {
                state.isLoadingFeed = false;
                state.hasFeedError = true;
                state.reviews = [];
            })

            .addCase(loadFeedShows.pending, (state) => {
                state.isLoadingFeed = true;
                state.hasFeedError = false;
            })
            .addCase(loadFeedShows.fulfilled, (state, action) => {
                state.isLoadingFeed = false;
                state.shows = action.payload;
            })
            .addCase(loadFeedShows.rejected, (state) => {
                state.isLoadingFeed = false;
                state.hasFeedError = true;
                state.shows = [];
            })
    },
});

//Exports state, actions, and reducer
export const selectReviews = (state) => state.feed.reviews;

export const selectShows = (state) => state.feed.shows;

export const isLoading = (state) => state.feed.isLoadingFeed;

export const hasError = (state) => state.feed.hasFeedError;

export default feedSlice.reducer;