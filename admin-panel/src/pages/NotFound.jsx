import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p className="mt-3">
        Page Not Found
      </p>

      <Link
        to="/dashboard"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go Dashboard
      </Link>

    </div>
  );
}

export default NotFound;