import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App/App';

import './index.css';

import RegisterServiceWorker from './helpers/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

RegisterServiceWorker();
