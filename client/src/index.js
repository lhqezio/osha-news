import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import PostArticle from './Post/Post.jsx';
import ErrorPage from './error-page';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './Signup/Login.jsx';
import { Provider } from 'react-redux';
import { store } from './userStore';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from './Config.js';

// Linter doesn't like the process since it is run from server it doesn't understand process
// eslint-disable-next-line no-undef
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
import './i18n';
import Profile from './Profile/Profile.jsx';
import Navbar from './Navbar/Navbar.jsx';

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
    authority: config.authority,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: '/post',
        element: <PostArticle />,
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/login',
        element: <Login />,
      }
    ],
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={ clientId }><MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <div className="px-8">
          <RouterProvider router={router} />

        </div>
      </Provider>    
    </MsalProvider></GoogleOAuthProvider>
  </React.StrictMode>
);