import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container } from 'react-bootstrap';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import img from '../download.png';
import './profileEdit.css';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    charge: false,
    btn: true,
  };

  async componentDidMount() {
    await this.userInformation();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validation);
  };

  userInformation = async () => {
    this.setState({
      charge: true,
    });
    const receiveData = await getUser();
    this.setState({
      name: receiveData.name,
      email: receiveData.email,
      image: receiveData.image,
      description: receiveData.description,
      charge: false,
    });
  };

  updateInfo = async () => {
    const { history } = this.props;
    const { name, description, email, image } = this.state;
    await updateUser({ name, description, email, image });
    return history.push('/profile');
  };

  validation = () => {
    const { name, description, email } = this.state;
    const valid = [name, description, email];
    const val = valid.every((validate) => validate.length > 0);
    if (val) {
      this.setState({
        btn: !(valid),
      });
    }
  };

  render() {
    const { name, description, email, charge, btn } = this.state;
    return (
      <Container className="edit-container">

        <Header />
        {charge && <Loading />}
        <Form className="profile-edit-form">
          <fieldset>
            <Form.Group controlId="edit-input-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={ name }
                name="name"
                onChange={ this.handleChange }
              />
            </Form.Group>
            <Form.Group controlId="edit-input-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={ email }
                name="email"
                onChange={ this.handleChange }
              />
            </Form.Group>
            <Form.Group controlId="edit-input-description">
              <Form.Label>Enter your favorite music style</Form.Label>
              <Form.Control
                type="text"
                value={ description }
                name="description"
                onChange={ this.handleChange }
              />
            </Form.Group>

          </fieldset>
          <div className="search-button">
            <Button
              type="button"
              variant="primary"
              data-testid="edit-button-save"
              onClick={ this.updateInfo }
              disabled={ btn }
            >
              Edit profile
            </Button>
          </div>

        </Form>
        <img
          src={ img }
          alt="music"
          className="img-responsive rounded-image"
        />

      </Container>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
