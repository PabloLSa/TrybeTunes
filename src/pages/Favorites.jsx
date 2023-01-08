import React, { Component } from 'react';
import MusicCard from '../components/ MusicCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: false,
    music: [],
  };

  componentDidMount() {
    this.renderFavorite();
  }

  renderFavorite = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const favorita = await getFavoriteSongs();
      this.setState({
        music: favorita,
        isLoading: false,
      });
    });
  };

  render() {
    const { isLoading, music } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? <Loading /> : (music.map((musica) => (
          <MusicCard key={ musica.trackId } music={ musica } />
        )))}
      </div>
    );
  }
}

export default Favorites;
