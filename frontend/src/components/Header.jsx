import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-50 p-4">
      <div className="flex justify-center items-center gap-8 p-4">
        <div>
          <input
            type="search"
            placeholder="Search"
            className="px-30 py-2 rounded-lg bg-gray-300 "
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
