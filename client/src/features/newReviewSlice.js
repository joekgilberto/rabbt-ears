import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as tvmazeServices from '../utilities/tvmaze/tvmaze-service';
import { getUser } from '../utilities/local-storage';

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

const newReviewSlice = createSlice({
    name: 'newReview',
    initialState: {
        show: {},
        newReview: {
            rating: 0,
            review: '',
            title: '',
            poster: '',
            showId: 0,
            fav: false,
            tags: [],
            username: '',
            user: ''
        },
        isLoadingShow: false,
        hasShowError: false
    },
    reducers: {
        updateNewReview(state, action) {
            state.newReview.rating = action.payload.rating;
            state.newReview.review = action.payload.review;
            state.newReview.title = action.payload.title;
            state.newReview.poster = action.payload.poster;
            state.newReview.showId = action.payload.showId;
            state.newReview.fav = action.payload.fav;
            state.newReview.tags = action.payload.tags;
            state.newReview.username = action.payload.username;
            state.newReview.user = action.payload.user;
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
                state.newReview.poster = action.payload.show.image.original;
                state.newReview.showId = action.payload.show.id;
                state.newReview.username = action.payload.user.username;
                state.newReview.user = action.payload.user._id;
            })
            .addCase(loadShow.rejected, (state) => {
                state.isLoadingShow = false;
                state.hasShowError = true;
                state.show = {};
                state.newReview.title = '';
                state.newReview.poster = '';
                state.newReview.showId = 0;
                state.newReview.username = '';
                state.newReview.user = '';
            })
    },
})

export const selectNewReview = (state) => state.newReview.newReview;

export const selectShow = (state) => state.newReview.show;

export const { updateNewReview } = newReviewSlice.actions

export const isLoading = (state) => state.search.isLoadingShow;

export const hasError = (state) => state.search.hasShowError;

export default newReviewSlice.reducer;