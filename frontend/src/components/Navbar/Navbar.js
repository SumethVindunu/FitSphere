import React from 'react'
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('userId'); 
    toast.error("Logout successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
};
  return (
    <div>
        <nav className="bg-blue-500 p-4 shadow-lg">
        <div className="container mx-auto flex  ">
          <div
            className="text-white text-lg font-bold cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            My App
          </div>

          <div className="ml-auto flex space-x-4 ">
            <button
              className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={() => (window.location.href = "/register")}
            >
              Register
            </button>
            <button
              className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={() => (window.location.href = "login")}
            >
              Login
            </button>
            <button
              className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={() => (window.location.href = "profile")}
            >
              Profile
            </button>
            <button
              className="bg-white text-blue-500 hover:bg-red-400 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={handleLogout}
            >
              Logout
            </button>
           
            
           
          </div>
        </div>
      </nav>
      
    </div>
  )
}

export default Navbar
