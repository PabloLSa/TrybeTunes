import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import './search.css';

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
        <Form.Group controlId="search-artist-input">
          <Form.Control
            type="text"
            placeholder="Search artist"
            value={ name }
            onChange={ ({ target }) => this.setState({ name: target.value }) }
          />
        </Form.Group>
        <div className="search-button">
          <Button
            type="button"
            variant="primary"
            disabled={ name.length < 2 }
            onClick={ this.getAlbumsAPI }
          >
            Search
          </Button>
        </div>
        <p className="result-text">
          Result of Albums:
          {' '}
          {pesquisa}
        </p>
        <div className="album-list">
          {apiReturn ? (
            album.map((albuns) => (
              <Link
                key={ albuns.collectionId }
                to={ `/album/${albuns.collectionId}` }
              >
                <div className="album-card">
                  <img
                    src={ albuns.artworkUrl100 }
                    alt="Album artwork"
                    className="album-image"
                  />
                  <h1 className="album-title">{albuns.collectionName}</h1>
                </div>
              </Link>
            ))
          ) : (
            <p>Nenhum álbum foi encontrado</p>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
