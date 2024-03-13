import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import PostArticle from './Post/Post.jsx';
import ErrorPage from './error-page';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CreateAccount from './Signup/CreateAccount';
import { Provider } from 'react-redux';
import { store } from './userStore';

// Linter doesn't like the process since it is run from server it doesn't understand process
// eslint-disable-next-line no-undef
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
import './i18n';
import Profile from './Profile/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
        element: < Profile />
      },
      {
        path: '/signup',
        element: <CreateAccount />,
      }
    ],
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId={ clientId }>
      <Provider store={store}>
        <div className="px-8"><RouterProvider router={router} /></div>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);