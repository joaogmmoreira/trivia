import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Placar extends React.Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div className="placar">
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
      </div>
    );
  }
}

Placar.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isrequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Placar);
