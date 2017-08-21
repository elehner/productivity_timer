import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { PLAY, PAUSE } from '../actions';

const TimerControls = ({startHandler, pauseHandler, stopHandler, timer_state}) => {
  switch(timer_state) {
  case PLAY:
    return (
      <div>
        <Button
          raised color="primary"
          onClick={pauseHandler}
        >Pause</Button>
        <Button
          raised color="accent"
          onClick={stopHandler}
        >Stop</Button>
      </div>
    );
  case PAUSE:
    return (
      <div>
        <Button
          raised color="primary"
          onClick={startHandler}
        >Resume</Button>
        <Button
          raised color="accent"
          onClick={stopHandler}
        >Stop</Button>
      </div>
    );
  default:
    return (
      <div>
        <Button
          raised color="primary"
          onClick={startHandler}
        >Start</Button>
      </div>
    );
  }
};

TimerControls.propTypes = {
  startHandler: PropTypes.func.isRequired,
  pauseHandler: PropTypes.func.isRequired,
  stopHandler: PropTypes.func.isRequired,
  timer_state: PropTypes.string.isRequired
};

export default TimerControls;

