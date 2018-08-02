import React, { Component } from 'react';
import { render } from 'react-dom';
import { ButtonContainer, Button, Clock, NumericInput} from './Controls';
import './style.css';
import { Row, Col, Grid } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTimer: 20,
      restTimer: 10,
      cycle: 6,

      runningTimer: '',
      cycleCount: 1,
      isActiveTick: false,     
      timerID: undefined, 
      isPaused: false,
      display: '',
    };

    this.handleInputTimerChange = this.handleInputTimerChange.bind(this);
    this.startButtonClick = this.startButtonClick.bind(this);
    this.stopButtonClick = this.stopButtonClick.bind(this);
    this.pauseButtonClick = this.pauseButtonClick.bind(this);
    this.resumeButtonClick = this.resumeButtonClick.bind(this);

    this.beepSound = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
    this.startSound = "https://www.soundjay.com/misc/sounds/censor-beep-01.mp3";
    this.restSound = "https://www.soundjay.com/misc/sounds/censor-beep-3.mp3";
  }

  handleInputTimerChange(value, name) {
    this.setState(
      {[name]: value}
    );
  }

  startButtonClick(action) {
    this.setState({
        runningTimer: 5, //default 5 second warm-up
        cycleCount: 1,
        isActiveTick: false,
        display: 'Ready...',
    });

    this.setTimer();
  }

  stopButtonClick(action) {
    this.clearTimer();

    this.setState({
      runningTimer: '',
      isActiveTick: false,
      isPaused: false,
      display: '',
    });
  }

  pauseButtonClick(action) {
    clearInterval(this.state.timerID);
    this.setState({
      isPaused: true
    });
  }

  resumeButtonClick(action) {
    this.setTimer();
    this.setState({
      isPaused: false
    });
  }

  setTimer(){
    this.setState({
      timerID: setInterval(
        () => this.tick(),
        1000
      )  
    });
  }

  clearTimer(){
    clearInterval(this.state.timerID);
    this.setState({
      timerID: undefined
    });
  }

  tick() {
    if (this.state.runningTimer <= 5 && this.state.runningTimer > 0) {
      this.audio = new Audio(this.beepSound);
      this.audio.play();    
    }

    if (this.state.runningTimer > 0) {
      //Counting down
      this.setState({
        runningTimer: this.state.runningTimer - 1
      });
    }
    else {
      //Counted down to 0
      this.clearTimer();
      
      if (this.state.isActiveTick) {
        //Finished counting active timer,
        //check whether to switch to rest timer
        if (this.state.cycleCount < this.state.cycle) {
          this.setState(
          {
            cycleCount: this.state.cycleCount + 1,
            runningTimer: this.state.restTimer,
            isActiveTick: false,
            display: 'Rest',
          });

          this.audio = new Audio(this.restSound);
          this.audio.play();
          this.setTimer();
        }
        else {
          this.setState({
            display: 'Training is completed',
            runningTimer: "Well Done!"
          });
        }
      }
      else {
        //Finished counting rest timer,
        //switch to active timer
        this.setState(
        {
          runningTimer: this.state.activeTimer,
          isActiveTick: true,
          display: 'Round: ' +this.state.cycleCount,
        });

        this.audio = new Audio(this.startSound);
        this.audio.play();
        this.setTimer();
      }
    }
  }

  startStopButton() {
    return (
      this.state.timerID == undefined ? (
        <Button onClick={this.startButtonClick} 
          disabled={this.state.timerID!=undefined}>
          Start
        </Button>
      ) : (
        <Button onClick={this.stopButtonClick} 
          disabled={this.state.timerID==undefined}>
          Stop
        </Button>
      )
    );
  }

  pauseResumeButton() {
    return (
      this.state.isPaused ? (
        <Button onClick={this.resumeButtonClick} 
          disabled={this.state.timerID==undefined}>
          Resume
        </Button>
      ) : (
        <Button onClick={this.pauseButtonClick} 
          disabled={this.state.timerID==undefined}>
          Pause
        </Button>
      )
    );
  }

  render() {
    return (
      <div>
        <h1 className="title">HIIT Assistant</h1>
        
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={4} md={4}>
              <NumericInput inputLabel="Training interval (sec)" 
                inputValue={this.state.activeTimer}
                onValueChange={this.handleInputTimerChange}
                name="activeTimer"/>
            </Col>
            <Col xs={12} sm={4} md={4}>
              <NumericInput inputLabel="Rest interval (sec)" 
                inputValue={this.state.restTimer}
                onValueChange={this.handleInputTimerChange}
                name="restTimer"/>
            </Col>
            <Col xs={12} sm={4} md={4}>
              <NumericInput inputLabel="No. of round(s)" 
                inputValue={this.state.cycle}
                onValueChange={this.handleInputTimerChange}
                name="cycle"/>
            </Col>
          </Row>
        </Grid>         

        <ButtonContainer>
          {this.startStopButton()}
          {this.pauseResumeButton()}
        </ButtonContainer>        

        <div className="display">{this.state.display}</div>

        <Clock
          isActiveTick={this.state.isActiveTick}
          display={this.state.display}>
          {this.state.runningTimer}
        </Clock>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));