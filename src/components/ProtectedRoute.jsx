import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <div>Loading...</div>; // spinner use panna nalla irukum
  }
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
