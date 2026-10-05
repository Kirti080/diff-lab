import { Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import Results from "./pages/Results";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import { SignInPage } from "./app/auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/Create" element={<Create />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/results" element={<Results />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
