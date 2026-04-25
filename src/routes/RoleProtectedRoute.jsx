import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { role, loading } = useAuth();

  if (loading) return null;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;