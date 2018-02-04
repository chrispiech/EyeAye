import React, { Component } from 'react';
import E from './E2.svg';
import './App.css';
import PubNubReact from 'pubnub-react';

export default class DesktopApp extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-13c2bc5e-08c5-4592-8235-a152dda43d25',
      subscribeKey: 'sub-c-475356e2-0925-11e8-b7c9-024a5d295ade'
    });
    
    this.pubnub.init(this);
  }
  componentWillMount() {
    this.pubnub.subscribe({ channels: ['channel1'], withPresence: true });
    
    this.pubnub.getMessage('channel1', (msg) => {
      console.log(msg);
      var directions = ['up', 'down', 'left', 'right'];
      var chosen = directions[Math.floor(Math.random() * directions.length)];
      this.setState({
        direction : chosen
      });
    });
    
    this.pubnub.getStatus((st) => {
      console.log(st);
      this.pubnub.publish({ message: 'hello world from react', channel: 'channel1' });
    });
    
    this.setState({
      direction : 'left'
    })
  }
  render() {
    return (
      <div className="App">
        <Header message="Horus"/>
        <p className="App-intro">
          Minimal Viable Product
        </p>
        <TestE direction={this.state.direction}/>
        <button onClick = {()=> {
          this.pubnub.publish({
            message: 'click',
            channel: 'channel1'
          });
        }}>
        Click me
        </button>
      </div>
    );
  }
}

class TestE extends Component {
  componentWillMount() {
    /*this.directionChangeInterval = setInterval(()=>{
      var chosen = directions[Math.floor(Math.random() * directions.length)];
      this.setState({
        direction : chosen
      });
    }, 1000);*/
  }
  componentWillUnmount() {
    clearInterval(this.directionChangeInterval)
  }
  render() {
    return (
      <div>
        <img src={E} className={"E " + this.props.direction} alt="Snellen" />
      </div>
    );
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