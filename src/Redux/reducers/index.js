import { combineReducers } from 'redux';
import token from './token';
import login from './login';
import player from './player';

const rootReducer = combineReducers({
  token,
  login,
  player,
});

export default rootReducer;
