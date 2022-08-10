import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  feedbackMessage() {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return <h2>Could be better...</h2>;
    }
    if (assertions >= three) {
      return <h2>Well Done!</h2>;
    }
  }

  render() {
    return (
      <div>
        <h1>Feedback</h1>
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
};

export default connect(mapStateToProps, null)(Feedback);
