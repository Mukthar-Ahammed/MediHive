import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Chat from "./pages/ChatPage";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const { authUser, checkAuth, isChecking,onlineFriends } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  

  if (isChecking && !authUser)
    return (
      <div className="flex items-center justify-center h-screen overflow-x-hidden ">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme="light">
      <NavBar />

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
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
