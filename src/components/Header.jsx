import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';

class Header extends Component {
  state = {
    nome: '',
    carregando: false,
  };

  componentDidMount() {
    this.name();
  }

  name = async () => {
    this.setState({
      carregando: true,
    });
    const { name } = await getUser();
    this.setState({
      nome: name,
      carregando: false,
    });
  };

  render() {
    const { nome, carregando } = this.state;
    return (
      <header data-testid="header-component" className="header">
        <Navbar expand="lg" variant="dark">
          <Navbar.Brand href="/" className="header-title">TrybeTunes</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={ Link } to="/search" data-testid="link-to-search">
                Search
              </Nav.Link>
              <Nav.Link as={ Link } to="/favorites" data-testid="link-to-favorites">
                Favorites
              </Nav.Link>
              <Nav.Link as={ Link } to="/profile" data-testid="link-to-profile">
                Profile
              </Nav.Link>
            </Nav>
            {carregando ? (
              <Loading />
            ) : (
              <div className="header-user">
                <span className="header-user-label">Listener:</span>
                <span className="header-user-name">{nome}</span>
              </div>
            )}
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
