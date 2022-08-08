import { combineReducers } from 'redux';
import token from './token';
import login from './login';

const rootReducer = combineReducers({
  token,
  login,
});

export default rootReducer;
