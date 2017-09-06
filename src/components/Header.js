import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { PLAY, PAUSE, STOP } from '../actions.js';

const Header = ({timer_state, current_period}) => {
  switch (timer_state) {
  case PLAY:
    return current_period.break
      ? (<Typography type="headline">Take a Break!</Typography>)
      : (<Typography type="headline">Get to Work!</Typography>);
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
};

Header.propTypes = {
  timer_state: PropTypes.string.isRequired,
  current_period: PropTypes.object.isRequired
};

export default Header;
