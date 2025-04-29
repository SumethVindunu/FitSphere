import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
    axios
      .get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching user data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  const UpdateNavigate = (id) => {
    window.location.href = `/updateprofile/${id}`;
  };

  const deleteaccount = async () => {
    const confirmation = window.confirm("Are you want to delete this account?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8080/user/${user.id}`);
        alert("account deleted successfully");
        localStorage.removeItem("userId");
        window.location.href = "/register";
      } catch (error) {
        alert("Error deleting account");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Full Name:</span> {user.fullname}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Password:</span> {user.password}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <div className="flex space-x-4">
            {" "}
            {/* Added flex and space-x-4 for spacing */}
            <button
              onClick={() => UpdateNavigate(user.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Update
            </button>
            <button
              onClick={() => deleteaccount(user.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user data available</p>
      )}
    </div>
  );
}

export default UserProfile;
