import React from 'react';


const Time = ({total_seconds}) => {
  let seconds = total_seconds % 60;
  let display_seconds = seconds < 10 ? "0" + String(seconds) : seconds;
  let display_minutes = Math.floor(total_seconds / 60);

  return(
    <div>
      <div>{display_minutes}:{display_seconds}</div>
    </div>
  );
}

export default Time;
