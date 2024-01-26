//Imports createAsyncThunk and createSlice from Redux's toolkit, and hurricaneServices from hurricane-service for API calls
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/reviews/reviews-service';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-service';

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

export const selectReviews = (state) => state.feed.reviews;

export const selectShows = (state) => state.feed.shows;

export const isLoading = (state) => state.feed.isLoadingFeed;

export const hasError = (state) => state.feed.hasFeedError;

export default feedSlice.reducer;