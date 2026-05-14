import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import Layout from "./components/Layout";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Students from "./Pages/Students";
import Tests from "./Pages/Tests";
import Marks from "./Pages/Marks";
import TotalMarks from "./Pages/TotalMarks";
import SchemaOverview from "./Pages/SchemaOverview";
import { isAuthenticated } from "./lib/auth";

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function PublicAuthRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <PublicAuthRoute>
              <Login />
            </PublicAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicAuthRoute>
              <Signup />
            </PublicAuthRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="students" element={<Students />} />
          <Route path="tests" element={<Tests />} />
          <Route path="marks" element={<Marks />} />
          <Route path="total-marks" element={<TotalMarks />} />
          <Route path="info" element={<SchemaOverview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
