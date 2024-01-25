import { configureStore } from '@reduxjs/toolkit';

import feedReducer from '../features/feedSlice';
import reviewReducer from '../features/reviewSlice';
import showReducer from '../features/showSlice';
import searchReducer from '../features/searchSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    review: reviewReducer,
    show: showReducer,
    search: searchReducer
  },
});
