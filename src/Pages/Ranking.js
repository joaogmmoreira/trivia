import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  getPlayers = () => {
    const localStorageKeys = Object.keys(localStorage);
    const filterLocalStorageKeys = localStorageKeys.filter((key) => key !== 'token'
      && key !== 'ranking');

    const players = [];

    for (let i = 0; i < filterLocalStorageKeys.length; i += 1) {
      const player = localStorage.getItem(filterLocalStorageKeys[i]);
      const playerParse = JSON.parse(player);
      players.push(playerParse);
    }
    return players;
  }

  renderPlayersRanking = () => {
    const playersRanking = this.getPlayers();
    console.log(playersRanking);

    return playersRanking.map((element, index) => {
      localStorage.setItem('ranking', [JSON.stringify(element.name, element.score)]);
      return (
        <div key={ element.name }>
          <p
            data-testid={ ` player-name-${index}` }
          >
            { element.name }
          </p>
          <p data-testid={ ` player-score-${index}` }>
            { element.score }
          </p>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
          >
            Home
          </button>
          { this.renderPlayersRanking() }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
