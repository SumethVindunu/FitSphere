<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
=======
import React from "react";
>>>>>>> Stashed changes
=======
import React from "react";
>>>>>>> Stashed changes
=======
import React from "react";
>>>>>>> Stashed changes
=======
import React from "react";
>>>>>>> Stashed changes
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
=======
  const userid = localStorage.getItem("userId");
>>>>>>> Stashed changes
=======
  const userid = localStorage.getItem("userId");
>>>>>>> Stashed changes
=======
  const userid = localStorage.getItem("userId");
>>>>>>> Stashed changes
=======
  const userid = localStorage.getItem("userId");
>>>>>>> Stashed changes

  const handleLogout = () => {
    localStorage.removeItem("userId");
    toast.error("Logout successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-500 p-4 shadow-lg">
        <div className="container mx-auto flex items-center">
=======
  return (
    <div>
=======
  return (
    <div>
>>>>>>> Stashed changes
=======
  return (
    <div>
>>>>>>> Stashed changes
=======
  return (
    <div>
>>>>>>> Stashed changes
      <nav className="bg-blue-500 p-4 shadow-lg">
        <div className="container mx-auto flex  ">
>>>>>>> Stashed changes
          <div
            className="text-white text-lg font-bold cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            My App
          </div>
<<<<<<< Updated upstream
          <button
            className="ml-auto text-white text-lg focus:outline-none mr-4"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Menu</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                to="/"
                className="w-full text-left hover:bg-gray-700 p-2 rounded block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/additem"
                className="w-full text-left hover:bg-gray-700 p-2 rounded block"
              >
                Add Posts
              </Link>
            </li>
            <li>
              <Link
                to="/viewstates"
                className="w-full text-left hover:bg-gray-700 p-2 rounded block"
              >
                View My Posts
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="w-full text-left hover:bg-gray-700 p-2 rounded block"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="w-full text-left hover:bg-gray-700 p-2 rounded block"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/userprofile"
                className="w-full text-left hover:bg-gray-700 p-2 rounded block"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                className="w-full text-left hover:bg-red-500 p-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <button
          className="absolute top-4 right-4 text-white text-lg focus:outline-none"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

=======

          <div className="ml-auto flex space-x-4 ">
            {!userid ? (
              <>
                {/* Register Button */}
                <button
                  className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  onClick={() => (window.location.href = "/register")}
                >
                  Register
                </button>

                {/* Login Button */}
                <button
                  className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                {/* Profile Button */}
                <button
                  className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  onClick={() => (window.location.href = "/profile")}
                >
                  Profile
                </button>

                {/* Logout Button */}
                <button
                  className="bg-white text-blue-500 hover:bg-red-400 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
export default Navbar;
