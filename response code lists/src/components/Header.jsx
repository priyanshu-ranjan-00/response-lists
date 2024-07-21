import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("userInfo");

  const handleHomeClick = () => {
    // Navigate to the homepage
    navigate("/");
  };

  return (
    <header className="w-full bg-gray-800 text-white py-4 px-6">
      <nav className="container mx-auto flex justify-between items-center">
        <h1
          onClick={handleHomeClick}
          className="text-2xl font-bold cursor-pointer"
        >
          Response Lists
        </h1>
        <div>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="text-white hover:underline mx-2">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:underline mx-2">
                Signup
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/lists" className="text-white hover:underline mx-2">
                Saved Lists
              </Link>
              {/* <Link to="/search" className="text-white hover:underline mx-2">
                SearchPage
              </Link> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
