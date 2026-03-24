import React from "react";
import { Navigate } from "react-router-dom";

// Checks if the user is authenticated (Supabase session or localStorage)
function ProtectedRoute({ children }) {
  // You can enhance this logic to check Supabase session if needed
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}

export default ProtectedRoute;