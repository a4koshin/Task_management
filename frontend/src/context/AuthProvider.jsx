import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      const userInfoParse = JSON.parse(storedUser);
      setName(userInfoParse.name || "");
      setEmail(userInfoParse.email || "");
      setRole(userInfoParse.role || "");
      setIsAuthenticated(true);
    } else {
      setName("");
      setEmail("");
      setRole("");
      setIsAuthenticated(false);
    }
  }, []);

  const logIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/users", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setName("");
    setEmail("");
    setRole("");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        setName,
        role,
        setRole,
        email,
        setEmail,
        isAuthenticated,
        setIsAuthenticated,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
