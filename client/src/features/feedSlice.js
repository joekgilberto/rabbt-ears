//Imports thunk and slice tools from Redux toolkit and custom review and tvmaze services API tools
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/review/review-services';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-services';
import { hasError } from './reviewSlice';

export const loadFeedFollows = createAsyncThunk(
    'feed/loadFeedFollows',
    async (following) => {
        return await reviewServices.getFollowingReviews(following);
    }
);

//Creates an async thunk to call all reviews and then updates the state with the response
export const loadFeedReviews = createAsyncThunk(
    'feed/loadFeedReviews',
    async () => {
        return await reviewServices.getAllReviews().then((res) => {
            if (res.length <= 10) {
                return res;
            } else {
                return res.slice(0, 10)
            }
        });
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
        follows: [],
        reviews: [],
        shows: [],
        isLoadingFollows: false,
        hasErrorFollows: false,
        isLoadingReviews: false,
        hasReviewsError: false,
        isLoadingShows: false,
        hasShowsError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFeedFollows.pending, (state) => {
                state.isLoadingFollows = true;
                state.hasErrorFollows = false;
            })
            .addCase(loadFeedFollows.fulfilled, (state, action) => {
                state.isLoadingFollows = false;
                state.follows = action.payload;
            })
            .addCase(loadFeedFollows.rejected, (state) => {
                state.isLoadingFollows = false;
                state.hasErrorFollows = true;
                state.follows = [];
            })

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
export const selectFollows = (state) => state.feed.follows;

export const selectReviews = (state) => state.feed.reviews;

export const selectShows = (state) => state.feed.shows;

export const isLoadingFollows = (state) => state.feed.isLoadingFollows;

export const hasFollowsError = (state) => state.feed.hasErrorFollows;

export const isLoadingReviews = (state) => state.feed.isLoadingReviews;

export const hasReviewsError = (state) => state.feed.hasReviewsError;

export const isLoadingShows = (state) => state.feed.isLoadingShows;

export const hasShowsError = (state) => state.feed.hasShowsError;

export default feedSlice.reducer;