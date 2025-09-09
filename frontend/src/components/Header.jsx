import React, { useState } from "react";
import { CalendarDays, LogOut, Search, User } from "lucide-react";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { name, logOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="bg-gray-50 shadow-sm px-6 py-4 flex justify-around items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back to your dashboard</p>
      </div>

      {/* Search Bar */}
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="search"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-gray-700"
        />
      </div>
      {/* User Section */}
      <div className="flex items-center gap-6 relative">
        {/* Calendar */}
        <button className="text-gray-600 hover:text-indigo-600 transition">
          <CalendarDays strokeWidth={1.75} className="w-6 h-6" />
        </button>
        {/* Greeting */}
        <span className="text-gray-700 font-medium">👋🏽 Hello, {name}</span>
        {/* Avatar with Dropdown */}
        <div className="relative" onMouseEnter={() => setShowMenu(true)}>
          <div className="rounded-full overflow-hidden w-10 h-10 border-2 border-indigo-600 bg-indigo-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90 transition">
            {name.charAt(0).toUpperCase()}
          </div>
          {/* Dropdown Menu */}
          {showMenu && (
            <div
              onMouseLeave={() => setShowMenu(false)}
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
            >
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition">
                <User className="w-5 h-5 text-indigo-600" /> Profile
              </button>
              <button
                onClick={logOut}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5 text-red-500" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
