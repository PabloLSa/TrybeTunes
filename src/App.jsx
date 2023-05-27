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
          backgroundImage: 'url("https://elements-cover-images-0.imgix.net/4a9d4368-17b6-4f3a-b54b-6e4629e84e23?auto=compress%2Cformat&fit=max&w=900&s=ffc31b3263e3448c7728c0bcd86cbc61")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } }
      >
        <Routes />
      </div>

    );
  }
}

export default App;
