import { combineReducers } from 'redux';
import token from './token';
import login from './login';
import timer from './timer';

const rootReducer = combineReducers({
  token,
  login,
  timer,
});

export default rootReducer;
