import { combineReducers } from 'redux';
import token from './token';
import login from './login';
// import questions from './questions';

const rootReducer = combineReducers({
  token,
  login,
  // questions,
});

export default rootReducer;
