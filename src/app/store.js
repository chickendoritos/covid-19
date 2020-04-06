import { configureStore } from '@reduxjs/toolkit';
import confirmedCasesReducer from '../features/confirmed_cases/reducer';
import counterReducer from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    confirmed_cases: confirmedCasesReducer
  },
});
