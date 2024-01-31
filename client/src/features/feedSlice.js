//Imports thunk and slice tools from Redux toolkit and custom review and tvmaze services API tools
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/review/review-services';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-services';

//Creates an async thunk to call all reviews then random shows, and then updates the state with the response
export const loadFeed = createAsyncThunk(
    'feed/loadFeed',
    async () => {
        const data = { reviews: [], shows: [] };
        return await reviewServices.getAllReviews().then(async (reviewRes) => {
            data.reviews = reviewRes;
            const reviewCount = data.reviews.length;
            return await tvmazeServices.getRandomShows(reviewCount).then((showRes) => {
                data.shows = showRes;
                return data;
            })
        })
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
            .addCase(loadFeed.pending, (state) => {
                state.isLoadingFeed = true;
                state.hasFeedError = false;
            })
            .addCase(loadFeed.fulfilled, (state, action) => {
                state.isLoadingFeed = false;
                state.reviews = action.payload.reviews;
                state.shows = action.payload.shows;
            })
            .addCase(loadFeed.rejected, (state) => {
                state.isLoadingFeed = false;
                state.hasFeedError = true;
                state.reviews = [];
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