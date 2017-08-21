/*
 * action types
 */

export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const STOP = 'STOP';
export const PERIOD_FINISH = 'PERIOD_FINISH';
export const TIMER_SETTINGS_UPDATE = 'TIMER_SETTINGS_UPDATE';

/*
 * action creators
 */

/* Timer controls */
export function play(start_time) {
  return { type: PLAY, start_time };
}

export function pause(elapsed_time) {
  return { type: PAUSE, elapsed_time };
}

export function stop() {
  return { type: STOP };
}

/* Period controls */
export function period_finish(start_time) {
  return { type: PERIOD_FINISH, start_time };
}
