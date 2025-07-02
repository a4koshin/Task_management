import React from "react";
import signupimg from "../assets/img/signimg.jpg";
import SignInPage from "./SignInPage";
import { Link } from "react-router-dom";
const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="grid grid-cols-2 gap-0 bg-white rounded-lg shadow-2xl overflow-hidden w-[800px]">
        <div className="flex items-center justify-center h-full">
          <img
            src={signupimg}
            alt="Sign up"
            className="w-full h-full object-cover"
          />
        </div>

        <form
          action=""
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
              className="px-4 py-2 bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:outline-none rounded-md transition"
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
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
              href={SignInPage}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Sign In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
