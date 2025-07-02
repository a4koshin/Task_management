import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Aside />
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
