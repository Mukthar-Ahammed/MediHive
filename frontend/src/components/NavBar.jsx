import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { House, User, LogOut } from "lucide-react";
import MedSearch from "./MedSearch";

const NavBar = () => {
  const { authUser, logout } = useAuthStore();
  const location = useLocation();
  const hiddenpath = ["/disease-prediction", "/Admin"];

  return (
    <div className="w-full px-5 py-3  flex flex-row sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
      {authUser && !hiddenpath.includes(location.pathname) && (
        <div className="flex justify-center sm:justify-start">
          <Link to="/">
            <House color="#000000" size={28} />
          </Link>
        </div>
      )}

      {authUser && !hiddenpath.includes(location.pathname) && (
        <div className="w-full sm:max-w-xl flex justify-center">
          <MedSearch />
        </div>
      )}

      {authUser && !hiddenpath.includes(location.pathname) && (
        <div className="flex justify-center sm:justify-end items-center gap-6">
          <Link to="/Profile" className="hover:scale-105 transition-transform">
            <User color="#000000" size={28} />
          </Link>
          <button
            onClick={logout}
            className="hover:scale-105 transition-transform"
          >
            <LogOut color="#FF0000" size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
