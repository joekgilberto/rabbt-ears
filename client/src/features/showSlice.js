//Imports thunk and slice tools from Redux toolkit and custom tvmaze and review services API tools
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-services';
import * as reviewServices from '../utilities/review/review-services';

//Creates an async thunk to call a shows based on a passed through id, along with its reviews, and then calculates the average of its reviews
export const loadShow = createAsyncThunk(
    'show/loadShow',
    async (id) => {
        const data = { show: {}, reviews: [], average: 0 };
        return await tvmazeServices.getShow(id).then(async (showRes) => {
            data.show = showRes;
            return await reviewServices.getAssociated(id).then((reviewRes) => {
                data.reviews = reviewRes;

                if(!reviewRes.length){
                    return data
                }
            
                let sum = 0;
                for (let review of reviewRes){
                    sum += review.rating;
                }
                const average = sum/reviewRes.length;

                data.average = average;

                return data
            })
        })
    }
);

//Creates and showSlice with show, reviews, average, isLoading, and error state, along with its reducers
export const showSlice = createSlice({
    name: 'show',
    initialState: {
        show: {},
        reviews: [],
        average: 0,
        isLoadingShow: false,
        hasShowError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadShow.pending, (state) => {
                state.isLoadingShow = true;
                state.hasShowError = false;
            })
            .addCase(loadShow.fulfilled, (state, action) => {
                state.isLoadingShow = false;
                state.show = action.payload.show;
                state.reviews = action.payload.reviews;
                state.average = action.payload.average;
            })
            .addCase(loadShow.rejected, (state) => {
                state.isLoadingShow = false;
                state.hasShowError = true;
                state.show = {};
                state.reviews = [];
                state.average = 0;
            })
    },
});

//Exports state, actions, and reducer
export const selectShow = (state) => state.show.show;

export const selectReviews = (state) => state.show.reviews;

export const selectAverage = (state) => state.show.average;

export const isLoading = (state) => state.show.isLoadingShow;

export const hasError = (state) => state.show.hasShowError;

export default showSlice.reducer;