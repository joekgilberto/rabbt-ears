//Imports configureStore from the Redux tool kit
import { configureStore } from '@reduxjs/toolkit';

//Imports reducers
import feedReducer from '../features/feedSlice';
import reviewReducer from '../features/reviewSlice';
import newReviewReducer from '../features/newReviewSlice';
import editReviewReducer from '../features/editReviewSlice';
import showReducer from '../features/showSlice';
import searchReducer from '../features/searchSlice';
import authReducer from '../features/authSlice';
import profileReducer from '../features/profileSlice';
import otherProfileReducer from '../features/otherProfileSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
    editReview: editReviewReducer,
    show: showReducer,
    search: searchReducer,
    auth: authReducer,
    profile: profileReducer,
    otherProfile: otherProfileReducer
  }
});
