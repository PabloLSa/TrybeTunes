import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './profile.css';

class Profile extends Component {
  state = {
    name: '',
    email: '',
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
    const { name, description, email } = await getUser();
    this.setState({
      name,
      email,
      description,
      charge: false,
    });
  };

  render() {
    const { name, description, email, charge } = this.state;
    return (
      <div data-testid="page-profile" className="container">
        <Header />
        {charge && <Loading />}
        <Form className="profile-form">
          <p>{name}</p>
          <p>{description}</p>
          <p>{email}</p>
          <Link to="/profile/edit" className="edit-profile-link">Editar perfil</Link>
        </Form>

      </div>
    );
  }
}

export default Profile;
