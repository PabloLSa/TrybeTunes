import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    charge: false,
  };

  componentDidMount() {
    this.userInformation();
  }

  userInformation = async () => {
    this.setState({
      charge: true,
    });
    const { name, description, email, image } = await getUser();
    this.setState({
      name,
      email,
      image,
      description,
      charge: false,
    });
  };

  render() {
    const { name, description, email, image, charge } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { charge && <Loading /> }
        <p>{ name }</p>
        <p>{description }</p>
        <p>{ email }</p>
        <img
          src={ image }
          alt=""
          data-testid="profile-image"
        />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
