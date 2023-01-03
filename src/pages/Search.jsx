import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isDisabled: true,
    name: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const num = 2;
    const valid = value.length >= num;
    this.setState({
      name: value,
      isDisabled: !valid,
    });
  };

  render() {
    const { name, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isDisabled }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
