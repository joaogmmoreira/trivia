import { combineReducers } from 'redux';
import token from './token';
import login from './login';
import nextQuestion from './nextQuestion';

const rootReducer = combineReducers({
  token,
  login,
  nextQuestion,
});

export default rootReducer;
