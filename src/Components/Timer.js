import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <div className="center">
        <h3 className="timer">{timer}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
});

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Timer);
