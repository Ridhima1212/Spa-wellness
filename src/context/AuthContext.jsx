/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }

    setLoading(false);
  }, []);

  const login = (email, password, selectedRole) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) =>
      user.email === email &&
      user.password === password &&
      user.role === selectedRole
  );

  if (foundUser) {
    localStorage.setItem("user", JSON.stringify(foundUser));
    localStorage.setItem("role", foundUser.role);

    setUser(foundUser);
    setRole(foundUser.role);

    return foundUser;
  }

  return null;
};

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
