import React, { Component } from 'react';
import E from './E2.svg';
import './App.css';
import PubNubReact from 'pubnub-react';
import 'bootstrap/dist/css/bootstrap.css';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

export default class DesktopApp extends Component {
  
  
  // note that acuitySize is on the snellen scale
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
    this.nextTestIndex = 0
    this.examOver = false;
    // set initial state
    this.setState({
      results : [],
      loading:false,
      direction : this.getNextDirection(),
      acuitySize:this.getNextSize(),
    });
    
    this.pubnub.getMessage('channel1', (msg) => {
      const guess = msg.message;
      this.setState({
        loading:true
      })
      this.recordGuess(guess);
      setTimeout(() => {
        this.setNextTest()
        this.setState({
          loading:false
        })
      }, 500);
    });
    
    // publish a test message
    // this.pubnub.getStatus((st) => {
    //   console.log(st);
    //   this.pubnub.publish({ message: 'hello world from react', channel: 'channel1' });
    // });
  }
  
  recordGuess(guess) {
    // short circuit if the test is over
    if(this.examOver) {
      return;
    }
    
    // default to incorrect
    var result = [this.state.acuitySize, 0]
    if(guess === this.state.direction) {
      // mark result as correct
      result[1] = 1
    } 
    this.state.results.push(result)
    
    // output results
    var output = ''
    for(var i = 0; i < this.state.results.length; i++) {
      output += this.state.results[i] + '\n' 
    }
    console.log(output);
  }
  
  setNextTest() {
    this.nextTestIndex = this.nextTestIndex + 1
    this.setState({
      direction : this.getNextDirection(),
      acuitySize:this.getNextSize(),
    });
  }
  
  getNextDirection() {
    var directions = ['up', 'down', 'left', 'right'];
    return directions[Math.floor(Math.random() * directions.length)];
  }
  
  getNextSize() {
    const tests = this.getSnellenTests()
    if(this.nextTestIndex >= tests.length) {
      this.examOver = true;
      return 200;
    }
    return tests[this.nextTestIndex];
  }
  
  getSnellenTests() {
    var sizes = [100, 50, 40, 30, 25, 20]
    var tests = []
    for (var sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) {
      const size = sizes[sizeIndex];
      for(var i = 0; i < 5; i++) {
        tests.push(size);
      }
    }

    return tests
  }
  
  render() {
    return (
      <div className="App">
        <Header message="Horus"/>
        <div className ="container">
          <div className="row mt-4">
            <div className="col">
              <TestE loading = {this.state.loading} direction={this.state.direction} acuitySize = {this.state.acuitySize}/>
  
              <button className="btn btn-secondary mt-4" onClick = {()=> {
                  this.pubnub.publish({
                    message: 'click',
                    channel: 'channel1'
                  });
                }}>
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

class TestE extends Component {
  componentWillMount() {
  }
  
  componentWillUnmount() {
    clearInterval(this.directionChangeInterval)
  }
  
  getDegree(dir) {
    switch(dir) {
      case 'up': return -90;
      case 'down': return 90;
      case 'left': return 180
      case 'right': return 0;
    }
    throw new Error('unknown dir: ' + dir)
  }
  
  getScaleAmt(acuitySize) {
    // snellen calculation
    // https://en.wikipedia.org/wiki/Snellen_chart
    const widthMM = (acuitySize / 20.0) * 8.75 
    return this.convertMMToScale(widthMM);
  }
  
  convertMMToScale(mm) {
    // this is not an actual calcualtion!
    // figure out how many pixels there are in a mm
    
    // The size of a credit card is 85.60 mm × 53.98 mm
    // The size of a credit card is 373px x 236px
    // Can use either width or height to calibrate... use width
    const pix = mm * (373 / 85.60);
    
     // recall that by the definition of our SVG
     // the 1.0 scale makes the image 100 pixels
    return pix / 100;
  }
  
  composeTransforms(scale, rot) {
    // note that the space for the E is 300
    // note that the E svg is 100x100
    const divHeight = 500;
    const height = 100 * scale;
    if(height > divHeight) {
      console.warn('height is too large for display ' + height);
    }
    const dy = 200;
    const translateTrans = "translate(0px, " + dy + "px)"
    const rotateTrans = "rotate(" + rot + "deg)"
    const scaleTrans = "scale(" + scale + ", " + scale + ")"
    return translateTrans + "\n" + scaleTrans + "\n" + rotateTrans
  }
  
  render() {
    const rotateAmt = this.getDegree(this.props.direction);
    const scaleAmt = this.getScaleAmt(this.props.acuitySize);
    const transforms = this.composeTransforms(scaleAmt, rotateAmt);
    
    if(this.props.loading) {
        return (
        <div className="E-div">
          
        </div>
      );
    }
    
    return (
      <div className="E-div">
        <img src={E} style={{transform: transforms }} />
      </div>
    );
    
    // return (
    //   <div className="E-div">
    //     <CSSTransitionGroup
    //     transitionName="example"
    //   transitionAppear={true}
    //   transitionAppearTimeout={5000}
    //   transitionEnter={true}
    //   transitionEnterTimeout={5000}
    //   transitionLeave={true}
    //   transitionLeaveTimeout={5000}>
    //     <img src={E} style={{transform: transforms }} />
    //   </CSSTransitionGroup>
    //   </div>
    // );
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