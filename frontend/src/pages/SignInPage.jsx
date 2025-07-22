import React, { useState } from "react";
import signInImg from "../assets/img/signInImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    setIsAuthenticated,
    setFullName,
    setEmail: setAuthEmail,
    setRole,
  } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);

      if (!response || !response.token || !response.user) {
        toast.error("Invalid email or password.");
        setLoading(false);
        return;
      }

      // Save token and user object in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Update Auth context state immediately
      setIsAuthenticated(true);
      setFullName(response.user.fullname);
      setAuthEmail(response.user.email);
      setRole(response.user.role);

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="grid grid-cols-2 bg-white rounded-lg shadow-2xl overflow-hidden w-[800px]">
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center gap-6 px-10 py-8 w-full"
          >
            <Link to="/" className="text-indigo-600 hover:underline mb-2">
              &larr;
            </Link>
            <h1 className="text-3xl font-bold text-indigo-600 mb-2 text-center">
              Login
            </h1>
            <span className="text-gray-500 text-center mb-4">
              Login to access your account
            </span>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
                required
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
              <Link
                to="/signup"
                className="text-sm text-indigo-600 hover:underline"
              >
                Sign Up
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-indigo-600 px-4 py-2 text-white rounded-md w-full font-semibold mt-4 transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="flex items-center justify-center h-full">
            <img
              src={signInImg}
              alt="Sign in"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
