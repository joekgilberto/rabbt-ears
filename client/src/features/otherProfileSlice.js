import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/reviews/reviews-service';
import * as authServices from '../utilities/auth/auth-service';

export const loadOtherProfile = createAsyncThunk(
    'otherProfile/loadOtherProfile',
    async (id) => {
        const data = { user: {}, reviews: {}, favs:[] }
        return await authServices.getUser(id).then(async (userRes)=>{
            if (userRes.length){
                data.user = userRes[0];
            } else {
                throw Error('User not found.')
            }

            return await reviewServices.getUsersReview(userRes[0]._id).then((reviewRes) => {
                data.reviews = reviewRes;
    
                for (let review of reviewRes){
                    if (review.fav){
                        data.favs.push(review);
                    }
                }
    
                return data;
            });
        })

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

export const isLoading = (state) => state.otherProfile.isLoadingOtherProfile;

export const hasError = (state) => state.otherProfile.hasOtherProfileError;

export default otherProfileSlice.reducer;