import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, getUserFromLocalStorage } from "../services/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const queryClient = useQueryClient();

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data?.user);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    const token = getUserFromLocalStorage();
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
