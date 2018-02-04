import React, { Component } from 'react';
import HandheldApp from './Handheld.js'
import DesktopApp from './Desktop.js'

class App extends Component {
  
  componentWillMount() {
    this.setState({
      environment: 'choose'
    })
  }
  
  render() {
    const choice = (
      <div>
        <button onClick = {()=> {
            this.setState({
              environment: 'desktop'
            })
          }}>
          Desktop
        </button>
        <button onClick = {()=> {
            console.log('Handheld');
            this.setState({
              environment: 'handheld'
            })
          }}>
          Handheld
        </button>
      </div>
    );
    switch(this.state.environment) {
      case 'choose': return choice;
      case 'desktop': return <DesktopApp />;
      case 'handheld': return <HandheldApp />;
    }
    throw new Error('invalid environment');
  }
}


export default App;
