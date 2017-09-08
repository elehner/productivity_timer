import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { PLAY, PAUSE, STOP } from '../actions.js';

const mapStateToProps = (state, ownProps) => {
  return {
    timer_state: state.timer_state,
    prev_timer_state: ownProps.timer_state,
    current_period: state.current_period,
    notification_on: state.notification_on
  };
};

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prev_timer_state: undefined
    };
  }

  componentWillReceiveProps() {
    this.setState({
      prev_timer_state: this.props.timer_state,
    });
  }

  notify_user(message) {
    debugger;
    if (this.props.notification_on && this.state.prev_timer_state !== PAUSE)
      new Notification(message);
  }

  render() {
    let current_period = this.props.current_period;
    switch (this.props.timer_state) {
    case PLAY:
      if (current_period.break) {
        this.notify_user('Take a Break!');
        return (<Typography type="headline">Take a Break!</Typography>);
      } else{
        this.notify_user('Start working!');
        return (<Typography type="headline">Get to Work!</Typography>);
      }
    case PAUSE:
      return current_period.break
        ? (<Typography type="headline">Pausing your break, really?</Typography>)
        : (<Typography type="headline">Click resume to get back to work!</Typography>);
    case STOP:
      return (<Typography type="headline">Click Start to get to work!</Typography>);
    default:
      return(
        <div>
          How did you get here?
        </div>
      );
    }
  }

}

Header.propTypes = {
  timer_state: PropTypes.string.isRequired,
  prev_timer_state: PropTypes.string,
  current_period: PropTypes.object.isRequired,
  notification_on: PropTypes.bool.isRequired
};

const HeaderComponent = connect(mapStateToProps, null, null)(Header);

export default HeaderComponent;
