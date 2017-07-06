import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './containers/App/App';

import './index.css';

import RegisterServiceWorker from './helpers/registerServiceWorker';

ReactDOM.render(
  <BrowserRouter basename="/" forceRefresh={true}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

RegisterServiceWorker();
