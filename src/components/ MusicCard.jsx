import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  async componentDidMount() {
    this.setState({
      isChecked: await this.verificarFavotitas(),

    });
  }

  getFavorite = async ({ target: { checked } }) => {
    const { music } = this.props;
    this.setState({
      isLoading: true,
    });
    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({
      isLoading: false,
      isChecked: checked,
    });
  };

  verificarFavotitas = async () => {
    const favorita = await getFavoriteSongs();
    const { music: { trackId } } = this.props;
    return favorita.map((favorite) => favorite.trackId).includes(trackId);
  };

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { isChecked, isLoading } = this.state;
    return (
      <div>
        {isLoading && <Loading />}
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            name=""
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.getFavorite }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
}.isRequired;
export default MusicCard;
