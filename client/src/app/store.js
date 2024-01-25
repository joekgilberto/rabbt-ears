import { configureStore } from '@reduxjs/toolkit';

import feedReducer from '../features/feedSlice';
import reviewReducer from '../features/reviewSlice';
import showReducer from '../features/showSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    review: reviewReducer,
    show: showReducer
  },
});
