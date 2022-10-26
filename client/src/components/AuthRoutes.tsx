
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const AuthRoutes = () => {
    const userContext = useContext(UserContext);
    const location = useLocation();
  
    if (!userContext.user) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return <Outlet />;
}

export default AuthRoutes

