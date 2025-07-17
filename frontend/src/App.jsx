import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/SignUpPage";
import Login from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import Complete from "./pages/Completed";
import InProgress from "./pages/InProgress";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
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
        path="/inprogress"
        element={
          <PrivateRoute>
            <InProgress />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
