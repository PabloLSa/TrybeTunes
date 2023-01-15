import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

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

  handlechange = ({ target: { name, value } }) => {
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
    const { name, description, email, image } = this.state;
    const valid = [name, description, email, image];
    const val = valid.every((validate) => validate.length > 0);
    if (val) {
      this.setState({
        btn: !(valid),
      });
    }
  };

  render() {
    const { name, description, email, image, charge, btn } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {charge && <Loading />}
        <fieldset>
          <legend>Editar</legend>
          <input
            value={ name }
            name="name"
            type="text"
            data-testid="edit-input-name"
            onChange={ this.handlechange }
          />
          <input
            value={ email }
            name="email"
            type="text"
            data-testid="edit-input-email"
            onChange={ this.handlechange }
          />
          <input
            value={ description }
            name="description"
            type="text"
            data-testid="edit-input-description"
            onChange={ this.handlechange }
          />
          <input
            value={ image }
            name="image"
            type="text"
            data-testid="edit-input-image"
            onChange={ this.handlechange }
          />
        </fieldset>

        <button
          type="button"
          data-testid="edit-button-save"
          onClick={ this.updateInfo }
          disabled={ btn }
        >
          Editar perfil
        </button>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
