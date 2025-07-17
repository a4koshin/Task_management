import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [fullname, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); // new loading state

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const userInfoParse = JSON.parse(storedUser);
        setFullName(userInfoParse.fullname || "");
        setEmail(userInfoParse.email || "");
        setRole(userInfoParse.role || "");
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setFullName("");
        setEmail("");
        setRole("");
        setIsAuthenticated(false);
        console.error("Failed to parse user info from localStorage:", error);
      }
    } else {
      setFullName("");
      setEmail("");
      setRole("");
      setIsAuthenticated(false);
    }
    setLoadingAuth(false); // done checking
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setFullName("");
    setEmail("");
    setRole("");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        fullname,
        setFullName,
        role,
        setRole,
        email,
        setEmail,
        isAuthenticated,
        setIsAuthenticated,
        logOut,
        loadingAuth, // expose loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
