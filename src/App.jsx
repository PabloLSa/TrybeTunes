/* eslint-disable no-unreachable */
import React from 'react';
import Header from './components/Header';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Routes />
      </>

    );
  }
}

export default App;
