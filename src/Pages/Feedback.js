import React from 'react';
import PropTypes from 'prop-types';
import HeaderFeedback from '../Components/HeaderFeedback';
import PlayAgain from '../Components/PlayAgain';

class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <HeaderFeedback />
        <PlayAgain history={ history } />
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Feedback;
