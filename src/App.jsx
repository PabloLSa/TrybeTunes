/* eslint-disable no-unreachable */
import React from 'react';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={ {
          backgroundColor: 'black',

        } }
      >
        <Routes />
      </div>

    );
  }
}

export default App;
