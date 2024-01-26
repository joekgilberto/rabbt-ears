//Imports createAsyncThunk and createSlice from Redux's toolkit, and hurricaneServices from hurricane-service for API calls
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/reviews/reviews-service';
import { getUser } from '../utilities/local-storage';

export const loadProfile = createAsyncThunk(
    'profile/loadProfile',
    async () => {
        const data = { user: {}, reviews: {} }
        const user = getUser();
        data.user = user;
        return await reviewServices.getUsersReview(user._id).then((res) => {
            data.reviews = res;
            return data;
        });
    }
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: {},
        reviews: [],
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
            })
            .addCase(loadProfile.rejected, (state) => {
                state.isLoadingProfile = false;
                state.hasProfileError = true;
                state.user = {};
                state.reviews = [];
            })
    },
});

export const selectUser = (state) => state.profile.user;

export const selectReviews = (state) => state.profile.reviews;

export const isLoading = (state) => state.review.isLoadingProfile;

export const hasError = (state) => state.review.hasProfileError;

export default profileSlice.reducer;