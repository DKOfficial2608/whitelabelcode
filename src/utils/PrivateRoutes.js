import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";

const PrivateRoutes = () => {
  let is_login = localStorage.getItem("is_login");
  
  return is_login !== null ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
