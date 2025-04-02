import { Navigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";

export default function PublicRoute({ children }: { children: ReactNode }) {
  const { user } = UserAuth();

  if (user) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
} 