import React from 'react';
import Games from './QuestionsAnswers';

class NextButton extends React.Component {
  handleClickNext() {
    return <Games />;
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ handleClickNext() }
        >
          Next
        </button>
      </div>
    );
  }
}

export default NextButton;
