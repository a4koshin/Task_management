import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import ProtectedLayout from "../layouts/ProtectedLayout";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default PrivateRoute;
