import React from "react";
import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "./lib/adminSession";

function ProtectedRoute({ children }) {
  const isAdmin = isAdminLoggedIn();

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default ProtectedRoute;
