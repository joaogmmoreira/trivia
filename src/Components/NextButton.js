import React from 'react';

class NextButton extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => console.log('componente <NextButton />') }
        >
          Next
        </button>
      </div>
    );
  }
}

export default NextButton;
