import { configureStore } from '@reduxjs/toolkit';
import ageReducer from '../features/age/ageSlice';

export const store = configureStore({
  reducer: {
    age: ageReducer,
  },
});
