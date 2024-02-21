import {createBrowserRouter,RouterProvider} from "react-router-dom"
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from "./Root";
import ErrorPage from "./error-page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"/articles",
        element: <ErrorPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);