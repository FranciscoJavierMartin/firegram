import React from 'react';
import ReactDOM from 'react-dom';

//Imports for bootrstrap styles
/*import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle';*/
import 'bootstrap/dist/css/bootstrap.min.css';
// End of imports for bootstrap
import './index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { config } from 'dotenv';
import { Provider } from 'react-redux';
import { store } from './store/store';

config();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
