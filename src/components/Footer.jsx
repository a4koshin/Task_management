import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-gray-300 py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex items-center gap-2 ml-[-8rem]">
            <img
              src="./logo.svg"
              alt="logo"
              className="w-10 h-10 invert brightness-0"
            />
            <h1 className="text-xl font-bold text-white">FocusFlow</h1>
          </div>
          <p className="text-sm mt-2">Smart task management made simple.</p>
        </div>
        <div className="flex gap-4 text-sm mt-6 md:mt-0">
          <a href="#" className="hover:text-white">
            Home
          </a>
          <a href="#" className="hover:text-white">
            Features
          </a>
          <a href="#" className="hover:text-white">
            Our UI
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-gray-500">
        © 2025 FocusFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
