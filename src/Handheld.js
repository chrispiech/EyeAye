import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';
import Hammer from 'hammerjs';

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
      <div>
        <button onClick = {()=> {
            console.log('left');
          }}>
          Left
        </button>
        <button onClick = {()=> {
            console.log('left');
          }}>
          Down
        </button>
      </div>
    );
  }
}
