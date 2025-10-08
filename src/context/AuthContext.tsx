import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuth: (v: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuth] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    setAuth(!!localStorage.getItem("token"));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
