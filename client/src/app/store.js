import { configureStore } from '@reduxjs/toolkit';

import feedReducer from '../features/feedSlice';
import reviewReducer from '../features/reviewSlice';
import newReviewReducer from '../features/newReviewSlice';
import editReviewReducer from '../features/editReviewSlice';
import showReducer from '../features/showSlice';
import searchReducer from '../features/searchSlice';
import authReducer from '../features/authSlice';
import profileReducer from '../features/profileSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
    editReview: editReviewReducer,
    show: showReducer,
    search: searchReducer,
    auth: authReducer,
    profile: profileReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});
