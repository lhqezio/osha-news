import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const err = useRouteError();
  console.error(err);

  return (
    <div id="error-page">
      <h1>Error!</h1>
      <p>Unexpected error has occurred.</p>
      <p>
        <i>{err.statusText || err.message}</i>
      </p>
    </div>
  );
}