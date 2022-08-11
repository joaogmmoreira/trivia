import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderFeedback from '../Components/HeaderFeedback';
import PlayAgain from '../Components/PlayAgain';

class Feedback extends React.Component {
  feedbackMessage() {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return <h2 data-testid="feedback-text">Could be better...</h2>;
    }
    if (assertions >= three) {
      return <h2 data-testid="feedback-text">Well Done!</h2>;
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h1>Feedback</h1>
        <HeaderFeedback />
        <PlayAgain history={ history } />

        { this.feedbackMessage() }
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
