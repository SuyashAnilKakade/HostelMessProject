import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "ADMIN" | "STUDENT";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  role,
}) => {
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  // ❌ If token or role missing => go login
  if (!token || !storedRole) {
    return <Navigate to="/login" replace />;
  }

  // Normalize role
  const normalizedRole =
    storedRole === "ROLE_ADMIN"
      ? "ADMIN"
      : storedRole === "ROLE_STUDENT"
      ? "STUDENT"
      : storedRole;

  // ❌ Wrong role
  if (normalizedRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Access allowed
  return <>{children}</>;
};

export default ProtectedRoute;