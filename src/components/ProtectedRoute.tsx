import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

const ProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  if (inProgress !== InteractionStatus.None) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
