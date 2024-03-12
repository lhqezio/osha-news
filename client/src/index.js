import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import PostArticle from './Post/Post.jsx';
import Navbar from './Navbar/Navbar.jsx';
import ErrorPage from './error-page';
import './index.css';
import './i18n';
import Profile from './Profile/Profile.jsx';

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
        element: < Profile />
      }
    ],
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="px-8">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);