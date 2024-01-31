//Imports thunk and slice tools from Redux toolkit, custom tvmaze services API tools, and custom local storage tool to get current user
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-services';
import { getUser } from '../utilities/local-storage';

//Defines initial state of reviews
const initReview = {
    rating: 0,
    review: '',
    title: '',
    poster: '',
    showId: 0,
    finished: false,
    fav: false,
    tags: [],
    username: '',
}

//Creates an async thunk to call the current user from local stoage and a show (based on a passed in id), and then updates the state with the response
export const loadShow = createAsyncThunk(
    'newReview/loadShow',
    async (id) => {
        const data = { show: {}, user: {} };
        data.user = getUser();
        return await tvmazeServices.getShow(id).then((res)=>{
            data.show = res;
            return data
        })
    }
);

//Creates and newReviewSlice with show, review, isLoading, and error state, along with its reducers
const newReviewSlice = createSlice({
    name: 'newReview',
    initialState: {
        show: {},
        newReview: initReview,
        isLoadingShow: false,
        hasShowError: false
    },
    reducers: {
        updateNewReview(state, action) {
            state.newReview = action.payload;
        }
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
                state.newReview.title = action.payload.show.name;
                state.newReview.poster = action.payload.show.image?.original;
                state.newReview.showId = action.payload.show.id;
                state.newReview.username = action.payload.user.username;
            })
            .addCase(loadShow.rejected, (state) => {
                state.isLoadingShow = false;
                state.hasShowError = true;
                state.show = {};
                state.newReview = initReview;
            })
    },
})

//Exports state, actions, and reducer
export const selectNewReview = (state) => state.newReview.newReview;

export const selectShow = (state) => state.newReview.show;

export const { updateNewReview } = newReviewSlice.actions

export const isLoading = (state) => state.newReview.isLoadingShow;

export const hasError = (state) => state.newReview.hasShowError;

export default newReviewSlice.reducer;