import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Auth0Provider
          domain={"https://dev-ci21rmr346t07v4n.us.auth0.com"}
          clientId={"fxMpjeG9nWxOfUL7BgHbBIVLbHAV9moj"}
          audience={"https://pacientesapi.com"}
          useRefreshTokens
          cacheLocation="localstorage"
          authorizationParams={{
              redirect_uri: window.location.origin,
              audience: "https://pacientesapi.com"
          }}
      >
        <App />
      </Auth0Provider>
  </React.StrictMode>
);