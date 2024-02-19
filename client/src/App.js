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
            <div className="font-bold text-4xl">
              OSHA
            </div>
            <div className="mt-2">
              <ul className="list-disc">
                <li>
                  <a href="/image">
                    Go to Image Page
                  </a>
                </li>
                <li>
                  <a href="/comment">
                    Go to Comment Page
                  </a>
                </li>
              </ul>
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