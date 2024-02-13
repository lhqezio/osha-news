import { Route,Routes,RouterProvider, createBrowserRouter} from "react-router-dom";
import CommentPage from "./Comment/CommentPage"
import ImagePage from "./Image/ImagePage" 

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
      <Routes>
        <Route path="/" element= {
          <>
            <div>
            Welcome to React App
            </div>
            <div>
              <a href="/image">
                Go to Image Page
              </a>
            </div>
            <div>
              <a href="/comment">
                Go to Comment Page
              </a>
            </div>
          </>
        } />
        <Route path="/comment" element= {
          <CommentPage />
        } />

        <Route path="/image" element= {
          <ImagePage />
        } />
      </Routes>
  );
}