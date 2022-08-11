import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Ranking from './Ranking';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: false,
    };
  }

  componentDidMount() {
    this.setPlayer();
  }

  setPlayer = () => {
    const { player } = this.props;

    if (player.name.length > 0) {
      localStorage.setItem(player.name, [JSON.stringify(player)]);
    }
  }

  handleClickShowRanking = () => {
    this.setState({
      ranking: true,
    }, () => {
      this.renderRanking();
    });
  }

  handleClickHideRanking = () => {
    this.setState({
      ranking: false,
    });
  }

  renderRanking = () => {
    const { ranking } = this.state;
    const { history } = this.props;
    if (ranking) {
      return (
        <>
          <Ranking history={ history } />
          <button
            type="button"
            onClick={ this.handleClickHideRanking }
          >
            Hide Ranking
          </button>
        </>
      );
    }
    if (!ranking) {
      return (
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickShowRanking }
        >
          Show Ranking
        </button>
      );
    }
  }

  render() {
    return (
      <>
        <div>
          <h1>Feedback</h1>
        </div>
        <div>
          {this.renderRanking()}
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.shape({
      length: PropTypes.number,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
