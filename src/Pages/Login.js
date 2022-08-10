import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Gear } from 'phosphor-react';
import { getTokenThunk, setPlayer } from '../Redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isPlayButtonDisabled: true,
    };
  }

  componentDidMount() {
    this.fetchToken();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleButton();
    });
  }

  handleButton = () => {
    const { email, name } = this.state;

    const valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript

    if (email.match(valid) && name.length > 0) {
      return this.setState({
        isPlayButtonDisabled: false,
      });
    }
    return this.setState({
      isPlayButtonDisabled: true,
    });
  }

  handleLogin = () => {
    const { token, dispatchPlayer } = this.props;
    const { name, email } = this.state;

    localStorage.setItem('token', token);
    dispatchPlayer({ name, email });
  }

  fetchToken() {
    const { getToken } = this.props;
    getToken();
  }

  render() {
    const { isPlayButtonDisabled, email, name } = this.state;

    return (
      <div>

        <div className="settings">
          <Link to="Settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              <Gear size={ 20 } />
            </button>
          </Link>
        </div>

        <form>
          <input
            data-testid="input-gravatar-email"
            type="email"
            onChange={ this.onInputChange }
            placeholder="E-mail"
            value={ email }
            name="email"
          />
          <div>
            <input
              data-testid="input-player-name"
              type="text"
              onChange={ this.onInputChange }
              placeholder="Name"
              value={ name }
              name="name"
            />
          </div>
          <div>
            <Link to="quiz">
              <button
                data-testid="btn-play"
                type="button"
                disabled={ isPlayButtonDisabled }
                onClick={ this.handleLogin }
              >
                Play
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenThunk()),
  dispatchPlayer: (value) => dispatch(setPlayer(value)),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
});

Login.propTypes = {
  dispatchEmailPlayer: PropTypes.func,
  dispatchLogin: PropTypes.func,
  dispatchNamePlayer: PropTypes.func,
  getToken: PropTypes.func,
  history: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
