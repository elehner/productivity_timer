import React, { Component } from 'react';
import { PLAY, PAUSE, play, pause, stop } from '../actions';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

const mapStateToProps = state => {
  return {
    start_time: state.start_time,
    timer_state: state.timer_state
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // First creat the new object
  const { start_time } = stateProps;
  const { dispatch } = dispatchProps;
  let mergedProps = {
    stopHandler: () => {
      dispatch(stop());
    },
    startHandler: () => {
      let now = new Date();
      dispatch(play(now));
    },
    pauseHandler: () => {
      let now = new Date();
      let elapsed_time = now - start_time;
      dispatch(pause(elapsed_time));
    },
    timer_state: stateProps.timer_state
  };

  return Object.assign(mergedProps, stateProps, ownProps);
};

class ControlButtons extends Component {
  constructor (props) {
    super(props);
  }

  // Selects which component to render based on the given props
  componentToPopulate() {
    switch(this.props.timer_state) {
    case PLAY:
      return (
        <div>
          <Button
            raised color="primary"
            onClick={this.props.pauseHandler}
          >Pause</Button>
          <Button
            raised color="accent"
            onClick={this.props.stopHandler}
          >Stop</Button>
        </div>
      );
    case PAUSE:
      return (
        <div>
          <Button
            raised color="primary"
            onClick={this.props.startHandler}
          >Resume</Button>
          <Button
            raised color="accent"
            onClick={this.props.stopHandler}
          >Stop</Button>
        </div>
      );
    default:
      return (
        <div>
          <Button
            raised color="primary"
            onClick={this.props.startHandler}
          >Start</Button>
        </div>
      );
    }
  }

  render () {
    let component = this.componentToPopulate();
    return(
      <div>
        {component}
      </div>
    );
  }
}

let MappedControlButtons = connect(mapStateToProps, null, mergeProps)(ControlButtons);

export default MappedControlButtons;
