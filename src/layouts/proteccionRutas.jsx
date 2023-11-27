import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../function/tocken";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = getToken();

  if (isAuthenticated === null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
