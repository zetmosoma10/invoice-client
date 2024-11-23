import { createContext, useContext, useEffect, useState } from "react";
import { decodeJwt } from "../services/auth";
import { useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const queryClient = useQueryClient();

  const updateUser = (updatedUser) => {
    setUser(updatedUser); // This function updates the global user state
  };

  const fetchUser = async () => {
    try {
      const data = await getUser();
      setUser(data?.user);
    } catch (error) {
      console.log("Error fetching user.", error);
      logout();
    }
  };

  useEffect(() => {
    const token = decodeJwt();
    if (token) {
      fetchUser();
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
