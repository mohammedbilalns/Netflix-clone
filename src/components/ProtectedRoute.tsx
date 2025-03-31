import { Navigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
