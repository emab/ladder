import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';
import './index.css';

import store from './store';
import { getAuth0Environment } from './util/environment';

const auth0Environment = getAuth0Environment();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      {...auth0Environment}
      redirectUri={window.location.origin}
      scope="read:all"
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
