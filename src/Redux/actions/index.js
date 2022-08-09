import { ASSERTIONS, SCORE } from './actionTypes';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';
export const NEXT_QUESTION = 'NEXT_QUESTION';
// export const REQUEST_GRAVATAR_FAILED = 'REQUEST_GRAVATAR_FAILED';
// export const REQUEST_GRAVATAR_SUCCESS = 'REQUEST_GRAVATAR_SUCCESS';

export const DECREASE_COUNTDOWN = 'DECREASE_COUNTDOWN';
export const LOGIN = 'LOGIN';

export const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenFailed = (payload) => ({
  type: GET_TOKEN_FAILED,
  payload,
});

export const nextQuestion = (next) => ({
  type: NEXT_QUESTION,
  next,
});

export const decreaseCountdown = () => ({
  type: DECREASE_COUNTDOWN,
});

export const getTokenThunk = () => async (dispatch) => {
  dispatch(getToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const results = await response.json();
    dispatch(getTokenSuccess(results));
  } catch (error) {
    dispatch(getTokenFailed(error));
  }
};

export const getAssertions = (assertions) => ({
  type: ASSERTIONS,
  assertions,
});

export const getScore = (score) => ({
  type: SCORE,
  score,
});

export const setPlayer = (payload) => ({
  type: LOGIN,
  payload,
});
