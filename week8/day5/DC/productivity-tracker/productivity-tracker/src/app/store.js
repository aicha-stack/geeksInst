import { configureStore } from '@reduxjs/toolkit';
import trackerReducer from '../features/tracker/trackerSlice';

export const store = configureStore({
  reducer: {
    tracker: trackerReducer,
  },
});
