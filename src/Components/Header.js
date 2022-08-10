import React from 'react';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { playerName, playerEmail } = this.props;
    const hashEmail = MD5(playerEmail).toString();

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt={ `Imagem de ${playerName}` }
        />
        <h3 data-testid="header-player-name">{`Jogador: ${playerName}`}</h3>
        <h3 data-testid="header-score">Pontos: 0</h3>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  playerName: store.player.name,
  playerEmail: store.player.gravatarEmail,
});

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
