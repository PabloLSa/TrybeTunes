import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import img from '../download.png';
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
          <div className="profile-field">
            <h1>Name:</h1>
            <p>{name}</p>
          </div>
          <div className="profile-field">
            <h2>Email:</h2>
            <p>{email}</p>
          </div>
          <div className="profile-field">
            <h3>My favorite music style:</h3>
            <p>{description}</p>
          </div>

          <Link to="/profile/edit">
            <Button className="edit-profile-link" variant="secondary">
              Edit profile
            </Button>
          </Link>
        </Form>
        <div className="profile-image-container">
          <img
            src={ img }
            alt="music"
            className="img-responsive rounded-image"
          />
        </div>
      </div>
    );
  }
}

export default Profile;
