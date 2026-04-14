import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./context/AdminAuthContext";

function ProtectedRoute({ children }) {
  const { isAdmin, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="alert alert-info mb-0">Checking admin session...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default ProtectedRoute;
