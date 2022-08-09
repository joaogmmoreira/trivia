// import { REQUEST_GRAVATAR_FAILED, REQUEST_GRAVATAR_SUCCESS } from '../actions/index';

const INITIAL_STATE = {

};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_GRAVATAR_SUCCESS:
    return {
      ...state,
      image: action.payload,
    };

  case REQUEST_GRAVATAR_FAILED:
    return {
      ...state,
      error: action.error,
    };

  default:
    return state;
  }
};

export default login;
