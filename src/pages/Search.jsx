import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    name: '',
    album: [],
    isLoading: false,
    pesquisa: '',
    apiReturn: true,
  };

  getAlbumsAPI = async () => {
    this.setState({
      isLoading: true,
    });
    const { name } = this.state;
    const album = await searchAlbumsAPI(name);
    if (album.length === 0) {
      this.setState({
        isLoading: false,
        apiReturn: false,
      });
    }
    this.setState({
      album,
      isLoading: false,
      pesquisa: name,
      name: '',
    });
  };

  render() {
    const { name, isLoading, pesquisa, album, apiReturn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading && <Loading />}
        <input
          type="text"
          data-testid="search-artist-input"
          name="name"
          value={ name }
          onChange={ ({ target }) => this.setState({ name: target.value }) }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ name.length < 2 }
          onClick={ this.getAlbumsAPI }
        >
          Pesquisar

        </button>
        <p>
          {' '}
          Resultado de álbuns de:
          {' '}
          { pesquisa }
        </p>
        <div>
          {apiReturn ? album.map((albuns) => (
            <Link
              data-testid={ `link-to-album-${albuns.collectionId}` }
              key={ albuns.collectionId }
              to={ `/album/${albuns.collectionId}` }
            >
              <img
                src={ albuns.artworkUrl100 }
                alt="imagemDoALbum"
              />
              <h1>
                {albuns.collectionName}

              </h1>
            </Link>
          )) : <p>Nenhum álbum foi encontrado</p>}

        </div>
      </div>
    );
  }
}

export default Search;
