import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Task from "./pages/Task.jsx";
import Inprogress from "./pages/Inprogress.jsx";
import Completed from "./pages/Completed.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Home from "./pages/Home.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/task",
        element: <Task />,
      },
      {
        path: "/inprogress",
        element: <Inprogress />,
      },
      {
        path: "/completed",
        element: <Completed />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
