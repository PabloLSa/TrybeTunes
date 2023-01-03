import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    nome: '',
    carregando: false,

  };

  componentDidMount() { // exibindo o nome do usuário
    this.name();
  }

  name = async () => {
    this.setState({
      carregando: true, // essa função mostra o nome salvo no localStorage e mostra o caregando na tela
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
      <header data-testid="header-component">
        <p>TrybeTunes</p>
        <nav>
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">Search</Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        { carregando === true ? (<Loading />) // rederiza o carregando e nome do usário
          : (<p data-testid="header-user-name">{ nome }</p>)}

      </header>
    );
  }
}

export default Header;
