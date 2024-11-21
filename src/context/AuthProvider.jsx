import { createContext, useContext, useState } from "react";
import { decodeJwt } from "../services/auth";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(decodeJwt());

  const queryClient = useQueryClient();

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(decodeJwt());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
