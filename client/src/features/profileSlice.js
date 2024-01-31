//Imports thunk and slice tools from Redux toolkit, custom review services API tools, and custom local storage tool to get current user
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/review/review-services';
import { getUser } from '../utilities/local-storage';

//Creates an async thunk to call the current user from local stoage and their reviews (based on a passed in user id), and then updates the state with the response
export const loadProfile = createAsyncThunk(
    'profile/loadProfile',
    async () => {
        const data = { user: {}, reviews: {}, favs:[] }
        const user = getUser();
        data.user = user;
        return await reviewServices.getUsersReview(user._id).then((res) => {
            data.reviews = res;

            for (let review of res){
                if (review.fav){
                    data.favs.push(review);
                }
            }

            return data;
        });
    }
);

//Creates and profileSlice with user, reviews, favs, isLoading, and error state, along with its reducers
export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: {},
        reviews: [],
        favs: [],
        isLoadingProfile: false,
        hasProfileError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProfile.pending, (state) => {
                state.isLoadingProfile = true;
                state.hasProfileError = false;
            })
            .addCase(loadProfile.fulfilled, (state, action) => {
                state.isLoadingProfile = false;
                state.user = action.payload.user;
                state.reviews = action.payload.reviews;
                state.favs = action.payload.favs;
            })
            .addCase(loadProfile.rejected, (state) => {
                state.isLoadingProfile = false;
                state.hasProfileError = true;
                state.user = {};
                state.reviews = [];
                state.favs = [];
            })
    },
});

//Exports state, actions, and reducer
export const selectUser = (state) => state.profile.user;

export const selectReviews = (state) => state.profile.reviews;

export const selectFavs = (state) => state.profile.favs;

export const isLoading = (state) => state.review.isLoadingProfile;

export const hasError = (state) => state.review.hasProfileError;

export default profileSlice.reducer;