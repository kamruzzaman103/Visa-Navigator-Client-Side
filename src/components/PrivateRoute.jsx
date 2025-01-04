import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Use the custom hook

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Directly use the custom hook
  const location = useLocation();

  if (loading) return <p>Loading...</p>; // Show loading state

  if (!user) {
    // Redirect to login if no user is found
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Return the protected route's children if user is authenticated
};

export default PrivateRoute;
