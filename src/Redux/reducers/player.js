import { ASSERTIONS, LOGIN, SCORE } from '../actions/actionTypes';

// Reducer responsável por tratar todas as informações relacionadas ao jogador.

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };

  case ASSERTIONS:
    return { ...state, assertions: action.payload };

  case SCORE:
    return { ...state, score: action.payload };

  default:
    return state;
  }
}

export default player;
