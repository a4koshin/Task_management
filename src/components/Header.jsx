import React, { useState } from "react";
import { navigation } from "../constants/data";
import { HiBars3CenterLeft, HiMiniMinus } from "react-icons/hi2";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="sticky mx-auto mt-4 z-50 w-full max-w-3xl rounded-2xl bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg">
      <div className="flex justify-between items-center p-2">
        <div>
          <img src="./logo.svg" alt="logo" className="w-10 h-12" />
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex justify-center items-center gap-2 uppercase text-[.9rem] font-medium cursor-pointer text-gray-800">
            {navigation.map((item) => (
              <li key={item.id} to={item.url}>
                {item.title}
              </li>
            ))}
          </ul>
        </nav>
        {/* Desktop Sign Up Button */}
        <button className="hidden md:block bg-[#3744bd] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#4b57c4]">
          Sign Up
        </button>
        {/* Mobile Menu Toggle */}
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
        <nav className="md:hidden">
          <ul className="flex flex-col gap-2 px-4 pb-4 uppercase text-[.9rem] font-medium text-gray-800 cursor-pointer">
            {navigation.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
            <li>
              <button className="w-full bg-[#3744bd] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#4b57c4] mt-2">
                Sign Up
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
