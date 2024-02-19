import {createBrowserRouter,RouterProvider} from "react-router-dom"
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);