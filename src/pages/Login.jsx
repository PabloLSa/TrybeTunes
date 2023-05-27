import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form } from 'react-bootstrap';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

// or less ideally

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
      <Container
        data-testid="page-login"
        className="d-flex align-items-center justify-content-center"
        style={ { height: '100vh' } }
      >
        {isLoading && <Loading />}

        <Form.Label htmlFor="inputPassword5">Faça acesso ao Trybe Tunes</Form.Label>

        <Form.Control
          type="text"
          className="w-50"
          data-testid="login-name-input"
          id="name"
          name="name"
          placeholder="User name"
          onChange={ this.handleChange }
        />

        <Button
          size="lg"
          variant="primary"
          type="button"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ () => this.handleClick(name) }
        >
          Entrar
        </Button>
      </Container>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
