import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/reviews/reviews-service';
import { getUser } from '../utilities/local-storage';

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

export const selectUser = (state) => state.profile.user;

export const selectReviews = (state) => state.profile.reviews;

export const selectFavs = (state) => state.profile.favs;

export const isLoading = (state) => state.review.isLoadingProfile;

export const hasError = (state) => state.review.hasProfileError;

export default profileSlice.reducer;