import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
export default function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}
