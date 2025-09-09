import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navigation } from "../constants/data";
import { LogOut } from "lucide-react";

const Aside = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <aside
        className={`bg-indigo-700 text-white w-64 h-screen flex flex-col fixed md:static top-0 left-0 z-40 transform transition-transform duration-300translate-x-0
         md:translate-x-0 rounded-tr-4xl shadow-lg`}
      >
        {/* Logo Section */}
        <div className="flex flex-col justify-center items-center py-6 border-b border-indigo-600">
          <img
            src="./logo.svg"
            alt="logo"
            className="w-12 h-12 mb-2 invert brightness-0"
          />
          <h2 className="text-2xl font-bold">FocusFlow</h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-6 gap-2 px-4">
          {navigation.map((btn) => {
            const isActive = location.pathname === btn.path;
            return (
              <button
                key={btn.id}
                onClick={() => {
                  navigate(btn.path);
                }}
                className={`flex items-center gap-4 py-3 px-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-white text-indigo-700 shadow-md"
                    : "hover:bg-indigo-600/70 hover:text-white"
                }`}
              >
                <btn.icon
                  className={`w-6 h-6 ${
                    isActive ? "text-indigo-700" : "text-white"
                  }`}
                />
                <span className="text-lg">{btn.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Optional Logout at Bottom */}
        <div className="mt-auto px-4 py-6 border-t border-indigo-600">
          <button
            onClick={() => console.log("Logout")}
            className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-red-600 hover:text-white transition font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Aside;
