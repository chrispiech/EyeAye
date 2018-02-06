import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';
import Hammer from 'hammerjs';
import 'bootstrap/dist/css/bootstrap.css';

export default class HandheldApp extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-13c2bc5e-08c5-4592-8235-a152dda43d25',
      subscribeKey: 'sub-c-475356e2-0925-11e8-b7c9-024a5d295ade'
    });
    
    this.pubnub.init(this);
    
    this.hammer = new Hammer.Manager(document.body);
    this.hammer.add(new Hammer.Swipe());
  }
  
  componentWillMount() {
    this.hammer.on('swipe', (event)=>{
      alert(event);
    });
  }
  render() {
    return (
      <div className="App">
        <Header message="Horus"/>
        <div className ="container">
          <div className="row mt-4">
            <div className="col">
              
              
              <button className="btn btn-lg btn-secondary btn-block mt-4" onClick = {()=> {
                  this.pubnub.publish({
                    message: 'up',
                    channel: 'channel1'
                  });
                }}>
                Up
              </button>
              <button className="btn btn-lg btn-secondary btn-block mt-4" onClick = {()=> {
                  this.pubnub.publish({
                    message: 'down',
                    channel: 'channel1'
                  });
                }}>
                Down
              </button>
              <button className="btn btn-lg btn-secondary btn-block mt-4" onClick = {()=> {
                  this.pubnub.publish({
                    message: 'left',
                    channel: 'channel1'
                  });
                }}>
                Left
              </button>
              <button className="btn btn-lg btn-secondary btn-block mt-4" onClick = {()=> {
                  this.pubnub.publish({
                    message: 'right',
                    channel: 'channel1'
                  });
                }}>
                Right
              </button>
              <button className="btn btn-lg btn-secondary btn-block mt-4" onClick = {()=> {
                  this.pubnub.publish({
                    message: 'cantTell',
                    channel: 'channel1'
                  });
                }}>
                Can't tell
              </button>
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
        <h1 className="App-title">Horus Handheld</h1>
      </header>
    );
  }
}
