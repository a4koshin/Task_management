import React from "react";
import signInImg from "../assets/img/signinimg.png";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="grid grid-cols-2 bg-white rounded-lg shadow-2xl overflow-hidden w-[800px]">
        <form
          action=""
          className="flex flex-col justify-center gap-6 px-10 py-8 w-full"
        >
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
              className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
            <Link
              href="/signup"
              className="text-sm text-indigo-600 hover:underline"
            >
              Sign Up
            </Link>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 px-4 py-2 text-white rounded-md w-full hover:bg-indigo-700 transition font-semibold mt-4"
          >
            Login
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
  );
};

export default SignInPage;
