import { PLAY, PAUSE, STOP, PERIOD_FINISH, TIMER_SETTINGS_UPDATE, NOTIFICATION_SETTING_UPDATE } from './actions';

export const INITIAL_STATE = {
  time_offset: 0,
  timer_state: STOP,
  current_period: {
    interval: 1,
    break: false
  },
  timer_settings: {
    total_intervals: 8,
    length: 25*60,
    break_length: 5*60,
    long_break_interval: 4,
    long_break_length: 15*60,
  },
  notification_on: false
};

export function reducer(state = INITIAL_STATE, action) {
  let current_interval = state.current_period.interval;
  let break_status = !state.current_period.break;
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
      timer_state: STOP,
      current_period: {
        interval: 0,
        break: false
      }
    });
  case PERIOD_FINISH:
    return Object.assign({}, state, {
      start_time: action.start_time,
      time_offset: 0,
      current_period: {
        interval: break_status ? current_interval : current_interval + 1,
        break: break_status
      }
    });
  case NOTIFICATION_SETTING_UPDATE:
    return Object.assign({}, state, {
      notification_on: action.setting
    });

  case TIMER_SETTINGS_UPDATE:
  default:
    return state;
  }
}
