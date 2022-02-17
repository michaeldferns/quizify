import { combineReducers } from '@reduxjs/toolkit';
import configReducer from './configSlice';
import quizReducer from './quizSlice';

const rootReducer = combineReducers({
  config: configReducer,
  quiz: quizReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
