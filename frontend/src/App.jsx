import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Chat from "./pages/ChatPage";
import Logbookmain from "./pages/Logbookmain";
import PatientDetails from "./components/PatientDetails";
import MedSearchRp from "./pages/MedSearchRp";
import DiseasePredictionPage from "./pages/DiseasePredictionPage";
import Patient from "./components/Patient";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import { useAdminStore } from "./store/useAdminStore";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { adminAuth, isLoggingIn } = useAdminStore();
  const { authUser, checkAuth, isChecking } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (adminAuth) {
      navigate("/AdminHome");
    }
  }, [adminAuth, navigate]);

  console.log({ authUser });

  if (isChecking && !authUser)
    return (
      <div className="flex items-center justify-center h-screen overflow-x-hidden">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme="light" className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/Login" />}
          />
          <Route
            path="/Signup"
            element={!authUser ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/Login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/Profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/Login" />}
          />
          <Route
            path="/chat"
            element={authUser ? <Chat /> : <Navigate to="/Login" />}
          />
          <Route
            path="/logbook"
            element={authUser ? <Logbookmain /> : <Navigate to="/Login" />}
          />
          <Route
            path="/PatientDetails"
            element={authUser ? <PatientDetails /> : <Navigate to="/Login" />}
          />
          <Route
            path="/search-results"
            element={authUser ? <MedSearchRp /> : <Navigate to="/Login" />}
          />
          <Route
            path="/disease-prediction"
            element={authUser ? <DiseasePredictionPage /> : <Navigate to="/Login" />}
          />
          <Route 
            path="/Patient/:id" 
            element={<Patient />} 
          />
          <Route 
            path="/Admin" 
            element={<AdminLogin />} 
          />
          <Route 
            path="/AdminHome" 
            element={adminAuth ? <Admin /> : <Navigate to="/Admin" />} 
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
