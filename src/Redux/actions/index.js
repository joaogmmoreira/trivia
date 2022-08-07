export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';

export const loginAction = (value) => ({
  type: 'LOGIN',
  value,
});

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