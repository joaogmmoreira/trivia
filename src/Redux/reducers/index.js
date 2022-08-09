import { combineReducers } from 'redux';
import token from './token';
import timer from './timer';
import player from './player';

const rootReducer = combineReducers({
  token,
  player,
  timer,
});

export default rootReducer;
