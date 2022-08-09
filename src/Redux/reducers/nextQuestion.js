import { NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  nextQuestion: '',
};

const nextQuestion = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXT_QUESTION:
    return {
      ...state,
      nextQuestion: action.next,
    };

  default:
    return state;
  }
};

export default nextQuestion;
