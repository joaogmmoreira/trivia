import React from 'react';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../Styles/Header.css';

class Header extends React.Component {
  render() {
    const { playerName, playerEmail, playerScore } = this.props;
    const hashEmail = MD5(playerEmail).toString();

    return (
      <header>
        <img
          className="headerImg"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt={ `Imagem de ${playerName}` }
        />
        <h3
          className="headerPlayer"
          data-testid="header-player-name"
        >
          {`Jogador: ${playerName}`}
        </h3>
        <h3 className="headerScore" data-testid="header-score">
          {playerScore}
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  playerName: store.player.name,
  playerEmail: store.player.gravatarEmail,
  playerScore: store.player.score,
});

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
