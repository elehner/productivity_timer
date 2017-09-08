import { notification_setting_update } from './actions';

const notification_setup = (store) => {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    // If it doesn't, turn notifications off.
    store.dispatch(notification_setting_update(false));
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    // If it's okay, turn on notifications
    store.dispatch(notification_setting_update(true));
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, turn notifications on
      if (permission === 'granted') {
        store.dispatch(notification_setting_update(true));
      }
    });
  }
};

export default notification_setup;
