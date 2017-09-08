import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { reducer, INITIAL_STATE} from './reducers';
import notification_setting_update from './notification_setup';

let store = createStore(reducer, INITIAL_STATE);

notification_setting_update(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
