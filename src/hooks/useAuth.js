import React from "react";
import { AuthContext } from "@/contexts/AuthContext";
export default function useAuth() {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}
