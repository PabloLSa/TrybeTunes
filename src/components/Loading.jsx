import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

class Loading extends Component {
  render() {
    return (
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden text-white">Carregando...</span>
      </Spinner>
    );
  }
}

export default Loading;
