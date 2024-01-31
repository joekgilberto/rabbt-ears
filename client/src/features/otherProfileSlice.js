//Imports thunk and slice tools from Redux toolkit, custom review and auth services API tools
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewServices from '../utilities/review/review-services';
import * as authServices from '../utilities/auth/auth-service';

//Creates an async thunk to call get a user's info along with their reviews and favorites
export const loadOtherProfile = createAsyncThunk(
    'otherProfile/loadOtherProfile',
    async (id) => {
        const data = { user: {}, reviews: {}, favs:[] }
        return await authServices.getUser(id).then(async (userRes)=>{
            data.user = userRes;

            return await reviewServices.getUsersReview(userRes._id).then((reviewRes) => {
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

//Creates and otherProfileSlice with user, reviews, favs, isLoading, and error state, along with its reducers
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

//Exports state, actions, and reducer
export const selectUser = (state) => state.otherProfile.user;

export const selectReviews = (state) => state.otherProfile.reviews;

export const selectFavs = (state) => state.otherProfile.favs;

export const isLoading = (state) => state.otherProfile.isLoadingOtherProfile;

export const hasError = (state) => state.otherProfile.hasOtherProfileError;

export default otherProfileSlice.reducer;