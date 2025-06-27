import React, { useState } from "react";
import { HiBars3CenterLeft, HiMiniMinus } from "react-icons/hi2";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="sticky px-4 mx-auto mt-4 z-50 w-full max-w-3xl rounded-2xl bg-white/0 backdrop-blur-lg border border-white/30 shadow-lg mb-10">
      <div className="flex justify-between items-center p-2">
        <div className="flex justify-center items-center gap-2">
          <img src="./logo.svg" alt="logo" className="w-10 h-12" />
          <h1 className="text-indigo-700 font-semibold text-2xl">FocusFlow</h1>
        </div>
        <nav className="hidden md:flex gap-8">
          <button className="hidden md:block border-2 border-indigo-700 text-indigo-900 px-6 py-2 rounded-lg text-sm hover:border-indigo-500 hover:text-indigo-500">
            Sign In
          </button>
          <button className="hidden md:block bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm hover:bg-indigo-900">
            Join Us for free
          </button>
        </nav>
        <button onClick={toggleNavbar} className="md:hidden focus:outline-none">
          {isOpen ? (
            <HiMiniMinus className="w-8 h-8 text-[#3744bd]" />
          ) : (
            <HiBars3CenterLeft className="w-8 h-8 text-[#3744bd]" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden py-10">
          <ul className="flex flex-col gap-2 px-4 pb-4 uppercase text-[.9rem] font-medium text-gray-800 cursor-pointer">
            <li>
              <button className="w-full border-2 border-[#3744bd] text-indigo-900 px-6 py-4 rounded-lg text-sm hover:border-indigo-500 hover:text-indigo-500 mb-4">
                Sign In
              </button>
              <button className="w-full bg-[#3744bd] text-white px-6 py-4 rounded-lg text-sm hover:bg-[#4b57c4]">
                Join Us for free
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
