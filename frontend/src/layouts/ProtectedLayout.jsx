// src/layouts/ProtectedLayout.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Aside";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthProvider";

const ProtectedLayout = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const { logOut } = useAuth();

  const confirmLogout = () => {
    setShowModal(false);
    logOut();
  };

  return (
    <div className="flex">
      <Sidebar onLogoutClick={() => setShowModal(true)} />

      <div className="flex-1">
        <Header />
        <main className="p-4">{children}</main>
      </div>

      <Modal
        isVisible={showModal}
        title="Confirm Logout"
        onClose={() => setShowModal(false)}
        footer={
          <>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        }
      >
        <p className="text-gray-700">Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default ProtectedLayout;
