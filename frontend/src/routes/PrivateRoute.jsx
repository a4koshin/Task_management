import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import ProtectedLayout from "../layouts/ProtectedLayout";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    // You can show a loader or blank page while checking auth
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default PrivateRoute;
