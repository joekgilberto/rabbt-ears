import { configureStore } from '@reduxjs/toolkit';

import feedReducer from '../features/feedSlice';
import reviewReducer from '../features/reviewSlice';
import newReviewReducer from '../features/newReviewSlice';
import showReducer from '../features/showSlice';
import searchReducer from '../features/searchSlice';
import profileReducer from '../features/profileSlice';
import authSlice from '../features/authSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
    show: showReducer,
    search: searchReducer,
    profile: profileReducer,
    auth: authSlice
  },
});
