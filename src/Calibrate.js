import React, { Component } from 'react';
import E from './E2.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class CalibrateApp extends Component {
  
 
  
  componentWillMount() {
  }
  
  render() {
    return (
      <div className="App">
        <Header message="Horus"/>
        <div className ="container">
          <div className="row mt-4">
            <div className="col">
              <div className = "cardTest">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">Horus Desktop</h1>
      </header>
    );
  }
}