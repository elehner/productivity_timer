import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Time from '../components/Time';
import { PLAY } from '../actions.js';

const mapStateToProps = state => {
  let time_offset_in_seconds = Math.round(state.time_offset / 1000);
  return {
    start_time: state.start_time,
    period: state.period,
    elapsed_seconds: time_offset_in_seconds,
    time_offset_in_seconds: time_offset_in_seconds,
    timer_state: state.timer_state
  };
};

class Timer extends Component {
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
    this.setState(new_state);
  }

  render() {
    return Time({total_seconds: this.state.elapsed_seconds});
  }
}

Timer.propTypes = {
  start_time: PropTypes.object,
  period: PropTypes.object,
  elapsed_seconds: PropTypes.number,
  time_offset_in_seconds: PropTypes.number,
  timer_state: PropTypes.string.isRequired
};

const MappedTimer = connect(mapStateToProps)(Timer);

export default MappedTimer;
