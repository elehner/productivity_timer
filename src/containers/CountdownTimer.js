import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Time from '../components/Time';
import { PLAY, period_finish } from '../actions.js';

const countdownCalc = (current_period, timer_settings) => {
  return current_period.break
    ? (current_period.interval % timer_settings.long_break_interval) === 0
      ? timer_settings.long_break_length
      : timer_settings.break_length
    : timer_settings.length;
};

const mapStateToProps = state => {
  let time_offset_in_seconds = Math.round(state.time_offset / 1000);
  let countdownTo = countdownCalc(state.current_period, state.timer_settings);
  return {
    start_time: state.start_time,
    elapsed_seconds: time_offset_in_seconds,
    time_offset_in_seconds: time_offset_in_seconds,
    timer_state: state.timer_state,
    countdown_to: countdownTo
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // First creat the new object
  const { dispatch } = dispatchProps;
  let mergedProps = {
    period_finish: () => {
      dispatch(period_finish(new Date()));
    }
  };

  return Object.assign(mergedProps, stateProps, ownProps);
};

class CountdownTimer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      elapsed_seconds: props.elapsed_seconds,
      timer_id: undefined
    };
  }

  componentDidMount() {
    // If a start time is not given, then the system is either paused or
    // stopped, and a timer should not be started.
    if (this.state.timer_state === PLAY) {
      this._startTimer();
    }
  }

  componentWillUnmount() {
    this._stopTimer();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      elapsed_seconds: nextProps.elapsed_seconds,
    }, () => {
      // If a start time is given, ensure a timer is started. If not, ensure that
      // any active timers are stopped.
      if (this.props.timer_state === PLAY) {
        this._startTimer();
      } else {
        this._stopTimer();
      }
    });
  }

  _startTimer() {
    if (!this.state.timer_id) {
      this.setState({
        timer_id: setInterval(
          () => this._tick(),
          1000
        )
      });
    }
  }

  _stopTimer() {
    if (this.state.timer_id) {
      clearInterval(this.state.timer_id);
      // After stopping the timer, we should remove the Id.
      this.setState({timer_id: undefined});
    }
  }

  _tick() {
    let current_time = new Date();
    let diff = current_time - this.props.start_time;
    let seconds = Math.round(diff / 1000);

    this._updateState(seconds);
  }

  _updateState(elapsed_seconds) {
    let new_state = Object.assign({}, this.state, {
      elapsed_seconds: elapsed_seconds + this.props.time_offset_in_seconds
    });
    if (this.props.countdown_to <= this.state.elapsed_seconds) {
      this._stopTimer();
      this.props.period_finish();
    } else {
      this.setState(new_state);
    }
  }

  render () {
    return Time({total_seconds: this.props.countdown_to - this.state.elapsed_seconds});
  }
}

CountdownTimer.propTypes = {
  start_time: PropTypes.object,
  countdown_to: PropTypes.number,
  elapsed_seconds: PropTypes.number,
  time_offset_in_seconds: PropTypes.number,
  timer_state: PropTypes.string.isRequired,
  period_finish: PropTypes.func.isRequired
};

const MappedCountdownTimer = connect(mapStateToProps, null, mergeProps)(CountdownTimer);

export default MappedCountdownTimer;
