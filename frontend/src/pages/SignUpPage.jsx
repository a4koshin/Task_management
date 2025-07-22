import React, { useState } from "react";
import signupimg from "../assets/img/signUpImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { signup as signUpAPI } from "../services/auth";
import toast, { Toaster } from "react-hot-toast";

const SignUpPage = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !role || !password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await signUpAPI({
        fullname,
        email,
        role: role.toUpperCase(),
        password,
      });
      toast.success("Signup successful! please login to continue");
      setTimeout(() => {
        navigate("/login");
      }, 1500);

      setFullName("");
      setEmail("");
      setRole("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during sign up. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="grid grid-cols-2 gap-0 bg-white rounded-lg border-1 border-gray-300 overflow-hidden w-[800px]">
          <div className="flex items-center justify-center h-full">
            <img
              src={signupimg}
              alt="Sign up"
              className="w-full h-full object-cover"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-6 px-10 py-8 w-full"
          >
            <h1 className="text-3xl font-bold text-indigo-600 mb-2 text-center">
              Create an Account
            </h1>
            <span className="text-gray-500 text-center mb-4">
              Sign up to get started with Task Management
            </span>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
              >
                <option value="">Choose your role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 px-4 py-2 text-white rounded-md w-full hover:bg-indigo-700 transition font-semibold mt-2"
            >
              Sign Up
            </button>

            <span className="text-sm text-gray-500 text-center mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Sign In
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
