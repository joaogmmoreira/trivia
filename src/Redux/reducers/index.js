import { combineReducers } from 'redux';
import token from './token';
import login from './login';
import nextQuestion from './nextQuestion';
import timer from './timer';
import player from './player';

const rootReducer = combineReducers({
  token,
  login,
  nextQuestion,
  player,
  timer,
});

export default rootReducer;
