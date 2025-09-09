import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/SignUpPage";
import Login from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import Complete from "./pages/Completed";
import PrivateRoute from "./routes/PrivateRoute";
import Pending from "./pages/Pending";
import OverduePage from "./pages/OverduePage";
import Priority from "./pages/Priority";
import Calender from "./pages/Calender";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/task"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <PrivateRoute>
              <Complete />
            </PrivateRoute>
          }
        />
        <Route
          path="/pending"
          element={
            <PrivateRoute>
              <Pending />
            </PrivateRoute>
          }
        />
        <Route
          path="/priority"
          element={
            <PrivateRoute>
              <Priority />
            </PrivateRoute>
          }
        />
        <Route
          path="/overdue"
          element={
            <PrivateRoute>
              <OverduePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <Calender />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
