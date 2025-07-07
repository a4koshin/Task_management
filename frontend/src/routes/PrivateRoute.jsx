import { useAuth } from "../context/AuthProvider";
import ProtectedLayout from "../layouts/ProtectedLayout";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/login" />;
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default PrivateRoute;
