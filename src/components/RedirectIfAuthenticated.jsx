import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RedirectIfAuthenticated = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuthenticated;
