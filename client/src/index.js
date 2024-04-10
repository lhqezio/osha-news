import {createHashRouter, RouterProvider} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import PostArticle from './Post/Post.jsx';
import ErrorPage from './error-page';
import SoloArticle from './Article/SoloArticle.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './Signup/Login.jsx';
import { Provider } from 'react-redux';
import { store } from './userStore';

// Linter doesn't like the process since it is run from server it doesn't understand process
// eslint-disable-next-line no-undef
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
import './i18n';
import Profile from './Profile/Profile.jsx';
import Navbar from './Navbar/Navbar.jsx';
import Search from './Search/Search.jsx';
import FilterScroll from './FilterScroll.jsx';
// import FilterScroll from './FilterScroll.jsx';

const router = createHashRouter([
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
      },
      {
        path: '/search',
        element: <Search />,
      }
    ],
  },
  {
    path: '/article/:id',
    element: <SoloArticle />,
    errorElement: <ErrorPage />,
  },   
  {
    path:'/scroll',
    element: <FilterScroll />,
    errorElement: <ErrorPage />
  }
]
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId={ clientId }>
      <Provider store={store}>
        <div className="px-2 md:px-8"><RouterProvider router={router} /></div>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);