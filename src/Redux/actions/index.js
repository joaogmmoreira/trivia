// import { ASSERTIONS, SCORE, GET_TOKEN,
//   GET_TOKEN_SUCCESS, GET_TOKEN_FAILED, DECREASE_COUNTDOWN } from './actionTypes';
export const ASSERTIONS = 'ASSERTIONS';
export const SCORE = 'SCORE';
export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';
export const DECREASE_COUNTDOWN = 'DECREASE_COUNTDOWN';
export const RESET_COUNTDOWN = 'RESET_COUNTDOWN';

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

export const setAssertions = (payload) => ({
  type: ASSERTIONS,
  payload,
});

export const setScore = (payload) => ({
  type: SCORE,
  payload,
});

export const setPlayer = (payload) => ({
  type: LOGIN,
  payload,
});

export const resetCountdown = () => ({
  type: RESET_COUNTDOWN,
});
