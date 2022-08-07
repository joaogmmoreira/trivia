import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction, getTokenThunk } from '../Redux/actions';

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

  componentDidMount() {
    this.fetchToken();
  }

  fetchToken() {
    const { getToken } = this.props;
    getToken();
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
    const { token } = this.props;
    localStorage.setItem('token', token);
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
            <Link to ="quiz">
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
  dispatchLogin: (value) => dispatch(loginAction(value)),
  getToken: () => dispatch(getTokenThunk()),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
});


Login.propTypes = {
  getToken: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  // dispatchLogin: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
