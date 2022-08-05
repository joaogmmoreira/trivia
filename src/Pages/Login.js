import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../Redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isPlayButtonDisabled: true,
    };
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
    // const { history, dispatchLogin } = this.props;
    // const { email } = this.state;
    // dispatchLogin(email);
    // history.push('/carteira');
  }

  render() {
    const { isPlayButtonDisabled, email, name } = this.state;

    return (
      <div>
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
            <button
              data-testid="btn-play"
              type="button"
              disabled={ isPlayButtonDisabled }
              onClick={ this.handleLogin }
            >
              Play
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (value) => dispatch(loginAction(value)),
});

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  // dispatchLogin: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
