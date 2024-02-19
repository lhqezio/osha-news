import {RouterProvider, createBrowserRouter} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export const App = RouterProvider({router : router});
