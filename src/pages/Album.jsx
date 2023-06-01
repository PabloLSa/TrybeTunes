import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/ MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import './album.css';

class Album extends Component {
  state = {
    dadosArtista: [],
    musicas: [],
  };

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const number = 7;
    const iD = pathname.slice(number);
    const music = await getMusics(iD);
    this.setState({
      dadosArtista: music[0],
      musicas: music.slice(1),
    });
  }

  render() {
    const { dadosArtista, musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p className="white-text" data-testid="artist-name">{dadosArtista.artistName}</p>
        <p className="white-text" data-testid="album-name">
          {dadosArtista.collectionName}
        </p>
        {musicas.map((musica) => (
          <MusicCard key={ musica.trackId } music={ musica } />
        )) }
      </div>
    );
  }
}
Album.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;
export default Album;
