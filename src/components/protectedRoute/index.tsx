import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  role: string | null; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, role }) => {
  return role === "ROLE-ADMIN" ? element : <Navigate to="/" />;
};

export default ProtectedRoute;