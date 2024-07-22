import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("userInfo");

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("userInfo");
      navigate("/login");
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <header className="w-full bg-gray-800 text-white py-4 px-6">
      <nav className="container mx-auto flex flex-wrap justify-between items-center">
        <h1
          onClick={handleHomeClick}
          className="text-2xl font-bold cursor-pointer"
        >
          Res Lists
        </h1>
        <div className="flex flex-row items-center">
          {!isLoggedIn && (
            <div className="flex flex-row items-center">
              <Link to="/login" className="text-white hover:underline mx-2">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:underline mx-2">
                Signup
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div className="flex flex-row items-center">
              <Link
                to="/lists"
                className="text-white hover:underline mx-2 bg-blue-600 p-2 rounded-lg text-center hover:bg-blue-500"
              >
                Saved Lists
              </Link>
              <button
                onClick={handleLogout}
                className="text-white mx-2 bg-red-600 p-2 rounded-lg hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
