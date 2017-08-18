/*
 * action types
 */

export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const STOP = 'STOP';
export const PERIOD_FINISH = 'PERIOD_FINISH';
export const PERIOD_UPDATE = 'PERIOD_UPDATE';

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
export function period_update(elapsed_time, next_period) {
  return { type: PAUSE, elapsed_time, next_period };
}
