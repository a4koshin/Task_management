// src/components/Aside.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navigation } from "../constants/data";
import { HiBars3CenterLeft } from "react-icons/hi2";

const Aside = ({ onLogoutClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden p-3 fixed top-0 left-0 z-50"
      >
        <HiBars3CenterLeft className="w-6 h-6" />
      </button>

      <aside
        className={`bg-indigo-700  w-60 h-screen flex flex-col fixed  md:static top-0 left-0 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col justify-center items-center bg-indigo-700 p-4 w-full rounded-md">
          <img
            src="./logo.svg"
            alt="logo"
            className="w-10 h-10 mb-2 invert brightness-0"
          />
          <h3 className="text-xl font-semibold text-gray-100">FocusFlow</h3>
        </div>

        <div className="flex flex-col justify-center items-center text-4xl mt-8 w-full">
          {navigation.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                navigate(btn.path);
                setIsOpen(false);
              }}
              className={`font-medium text-base flex items-center gap-4 h-10 w-full px-4 rounded-r-2xl transition active:bg-white ${
                location.pathname === btn.path
                  ? "bg-gray-100 text-indigo-700"
                  : "text-gray-100 hover:bg-indigo-700 hover:text-gray-200"
              }`}
            >
              <span className="w-5 h-5">{btn.icon}</span>
              <span className="text-sm">{btn.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto w-full">
          <button
            onClick={onLogoutClick}
            className="font-medium text-base flex items-center gap-3 h-12 w-full rounded-r-2xl px-4 transition active:bg-white text-gray-100 hover:bg-gray-100 hover:text-indigo-600"
          >
            <span className="w-5 h-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </span>
            <span className="text-sm">Log-out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Aside;
