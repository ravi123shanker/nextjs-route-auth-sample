import React, { useEffect, useState } from "react";
import Auth from "@/lib/auth";
import { clearRedirect, getRedirect, setRedirect } from "@/utils/authUtils";

export const AuthContext = React.createContext({
  auth: null,
  initializing: false,
  user: null,
  error: null,
  setRedirect: null,
  getRedirect: null,
  clearRedirect: null,
});

AuthContext.displayName = "AuthContext";

const auth = new Auth();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    auth.resolveUser(2000).onAuthStateChanged((user, error) => {
      if (user) {
        setUser(user);
        setError(null);
      } else {
        setUser(null);
        if (error) {
          setError(error);
        }
      }
      setInitializing(false);
    });
  }, []);
  const value = {
    user,
    error,
    auth,
    initializing,
    setRedirect: setRedirect,
    getRedirect: getRedirect,
    clearRedirect: clearRedirect,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
