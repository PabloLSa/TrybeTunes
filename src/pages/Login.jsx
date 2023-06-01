import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form } from 'react-bootstrap';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import img from '../download.png';
import './login.css';

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
      <Container data-testid="page-login" className="login-container">
        <h1 className="text-center display-4 fw-bold">
          Listen to a snippet of your favorite song
        </h1>
        <legend className="mb-4 text-center fs-5" htmlFor="Access">Access Tunes</legend>

        <Form.Control
          type="text"
          className="w-50 mb-4"
          data-testid="login-name-input"
          id="name"
          name="name"
          placeholder="listener's name"
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

        <img
          src={ img }
          alt="music"
          className="img-responsive rounded-image"
        />
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
