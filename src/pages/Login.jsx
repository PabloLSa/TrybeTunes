import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    isDisabled: true,
    name: '',
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const num = 3;
    const valid = value.length >= num;
    this.setState({
      name: value,
      isDisabled: !valid,
    });
  };

  handleClick = async (name) => {
    const { history: { push } } = this.props;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
    });
    return push('/search');
  };

  render() {
    const { isDisabled, name, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading && <Loading />}
        <input
          type="text"
          data-testid="login-name-input"
          id="name"
          name="name"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ () => this.handleClick(name) }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
