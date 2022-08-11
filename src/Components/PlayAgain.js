import PropTypes from 'prop-types';
import React from 'react';

class PlayAgain extends React.Component {
  handleClick = (event) => {
    const { history } = this.props;
    event.preventDefault();

    history.push('/');
  };

  render() {
    return (
      <button data-testid="btn-play-again" type="submit" onClick={ this.handleClick }>
        Play Again
      </button>
    );
  }
}

PlayAgain.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default PlayAgain;
