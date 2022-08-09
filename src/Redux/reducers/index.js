import { combineReducers } from 'redux';
import token from './token';
import nextQuestion from './nextQuestion';
import timer from './timer';
import player from './player';

const rootReducer = combineReducers({
  token,
  nextQuestion,
  player,
  timer,
});

export default rootReducer;
