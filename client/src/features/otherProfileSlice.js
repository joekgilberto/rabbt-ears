import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/reviews/reviews-service';
import * as authServices from '../utilities/auth/auth-service';

export const loadOtherProfile = createAsyncThunk(
    'otherProfile/loadOtherProfile',
    async (id) => {
        const data = { user: {}, reviews: {}, favs:[] }
        const user = authServices.getUser(id);
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

export const otherProfileSlice = createSlice({
    name: 'otherProfile',
    initialState: {
        user: {},
        reviews: [],
        favs: [],
        isLoadingOtherProfile: false,
        hasOtherProfileError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOtherProfile.pending, (state) => {
                state.isLoadingOtherProfile = true;
                state.hasOtherProfileError = false;
            })
            .addCase(loadOtherProfile.fulfilled, (state, action) => {
                state.isLoadingOtherProfile = false;
                state.user = action.payload.user;
                state.reviews = action.payload.reviews;
                state.favs = action.payload.favs;
            })
            .addCase(loadOtherProfile.rejected, (state) => {
                state.isLoadingOtherProfile = false;
                state.hasOtherProfileError = true;
                state.user = {};
                state.reviews = [];
                state.favs = [];
            })
    },
});

export const selectUser = (state) => state.otherProfile.user;

export const selectReviews = (state) => state.otherProfile.reviews;

export const selectFavs = (state) => state.otherProfile.favs;

export const isLoading = (state) => state.review.isLoadingOtherProfile;

export const hasError = (state) => state.review.hasOtherProfileError;

export default otherProfileSlice.reducer;