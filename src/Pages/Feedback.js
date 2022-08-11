import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Ranking from './Ranking';
import HeaderFeedback from '../Components/HeaderFeedback';
import PlayAgain from '../Components/PlayAgain';
import Placar from '../Components/Placar';
import '../Styles/Feedback.css';

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
    const { history } = this.props;
    return (
      <section>

        <div>
          {this.renderRanking()}
        </div>

        <h1>Feedback</h1>

        <HeaderFeedback />
        { this.feedbackMessage() }
        <Placar />

        <PlayAgain history={ history } />
      </section>
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
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);

// const mapStateToProps = ({ player }) => ({
//   assertions: player.assertions,
// });

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
