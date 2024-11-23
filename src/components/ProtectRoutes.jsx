import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectRoutes = () => {
  const { user } = useAuth();
 

  if (!user) {
    return (
      <Navigate to="user/login" state={{ message: "You should login first" }} />
    );
  }

  return <Outlet />;
};

export default ProtectRoutes;
