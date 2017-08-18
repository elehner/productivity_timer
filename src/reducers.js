import { PLAY, PAUSE, STOP, PERIOD_FINISH } from './actions.js';

export const INITIAL_STATE = {
  time_offset: 0,
  state: STOP,
  period: {
    interval: 0,
    length: 25,
    break_length: 5,
    long_break_interval: 4,
    long_break_length: 15,
  },
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAY:
    return Object.assign({}, state, {
      start_time: action.start_time,
      timer_state: PLAY
    });
  case PAUSE:
    return Object.assign({}, state, {
      start_time: undefined,
      time_offset: state.time_offset + action.elapsed_time,
      timer_state: PAUSE
    });
  case STOP:
    return Object.assign({}, state, {
      start_time: undefined,
      time_offset: 0,
      timer_state: STOP
    });
  case PERIOD_FINISH:
    return Object.assign({}, state, {
      start_time: undefined,
      period: action.period
    });
  default:
    return state;
  }
}
