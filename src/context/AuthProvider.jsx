import { createContext, useContext, useState } from "react";
import { decodeJwt } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(decodeJwt());

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(decodeJwt());
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
