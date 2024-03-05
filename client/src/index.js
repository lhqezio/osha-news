import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import ErrorPage from './error-page';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Linter doesn't like the process since it is run from server it doesn't understand process
// eslint-disable-next-line no-undef
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId={ clientId }>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);