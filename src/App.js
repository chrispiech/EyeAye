import React, { Component } from 'react';
import HandheldApp from './Handheld.js'
import DesktopApp from './Desktop.js'
import CalibrateApp from './Calibrate.js'

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  
  componentWillMount() {
    this.setState({
      environment: 'choose'
    })
  }
  
  render() {
    const choice = (
      <div className="App">
        <Header message="Horus"/>
        <div className ="container">
          <div className="row mt-4">
            <div className="col">
              <div className="btn-group">
                <button className="btn btn-primary" onClick = {()=> {
                    this.setState({
                      environment: 'desktop'
                    })
                  }}>
                  Desktop
                </button>
                <button className="btn btn-secondary" onClick = {()=> {
                    this.setState({
                      environment: 'handheld'
                    })
                  }}>
                  Handheld
                </button>
                <button className="btn btn-secondary" onClick = {()=> {
                    this.setState({
                      environment: 'calibrate'
                    })
                  }}>
                  Calibrate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    switch(this.state.environment) {
      case 'choose': return choice;
      case 'calibrate': return <CalibrateApp />
      case 'desktop': return <DesktopApp />;
      case 'handheld': return <HandheldApp />;
    }
    throw new Error('invalid environment');
  }
}

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <h1 className="App-title">{this.props.message}</h1>
      </header>
    );
  }
}


export default App;
