import { DECREASE_COUNTDOWN } from '../actions';

const INITIAL_STATE = {
  timer: 30,
};

function timeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DECREASE_COUNTDOWN:
    return {
      timer: state.timer - 1,
    };
  default:
    return state;
  }
}

export default timeReducer;