import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import ErrorPage from './error-page';
import './index.css';
<<<<<<< HEAD
import { GoogleOAuthProvider } from '@react-oauth/google';
import CreateAccount from './Signup/CreateAccount';

// Linter doesn't like the process since it is run from server it doesn't understand process
// eslint-disable-next-line no-undef
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
=======
import './i18n';
>>>>>>> 3d65fa6f6e168dcb5a3e167eca1d0aaa855ac323

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <CreateAccount />,
    errorElement: <ErrorPage />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId={ clientId }>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);