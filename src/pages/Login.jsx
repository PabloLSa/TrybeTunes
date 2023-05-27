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
        className="d-flex flex-column align-items-center justify-content-center"
        style={ { height: '100vh',

        } }
      >
        <h1
          className="text-center display-4 fw-bold"
        >
          Listen to a snippet of your favorite song

        </h1>

        <p
          className="mb-4 text-center fs-5"
          style={ { fontSize: '1.5rem' } }
          htmlFor="Access"
        >
          Access Tunes
        </p>

        <Form.Control
          type="text"
          className="w-50 mb-4"
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
          Enter
        </Button>
        {isLoading && <Loading />}
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
