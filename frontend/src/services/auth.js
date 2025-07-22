import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    console.log("Login response:", response.data);

    return response.data;
  } catch (err) {
    console.error("Login failed:", err);

    toast.error("Login failed. Please check your credentials.");

    throw err;
  }
};

export const signup = async ({ fullname, email, role, password }) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      fullname,
      email,
      role,
      password,
    });

    return response.data;
  } catch (err) {
    console.error("Signup failed:", err);
    toast.error("Signup failed. Please try again.");
    throw err;
  }
};
