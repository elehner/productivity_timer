import { connect } from 'react-redux';
import { play, pause, stop } from '../actions';
import TimerControls from '../components/TimerControls';

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


const ControlButtons = connect(mapStateToProps, null, mergeProps)(TimerControls);

export default ControlButtons;
