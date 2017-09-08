import React from 'react';
import PropTypes from 'prop-types';

const Time = ({total_seconds}) => {
  let display_seconds = '00';
  let display_minutes = '0';
  // Time less than/equal to 0 should be displayed only as '0:00'
  if (total_seconds > 0) {
    let seconds = total_seconds % 60;
    display_seconds = seconds < 10 ? '0' + String(seconds) : seconds;
    display_minutes = Math.floor(total_seconds / 60);
  }

  return(
    <div>
      <div>{display_minutes}:{display_seconds}</div>
    </div>
  );
};

Time.propTypes = {
  total_seconds: PropTypes.number.isRequired
};

export default Time;
