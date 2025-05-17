import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProfile() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  // Fetch user data when the component loads
  useEffect(() => {
    if (!id) {
      console.error("ID is undefined. Cannot fetch user data.");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        const itemdata = response.data;
        setFormData({
          fullname: itemdata.fullname || "",
          email: itemdata.email || "",
          password: itemdata.password || "",
          phone: itemdata.phone || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Handle input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${id}`, formData);
      alert("Profile update successfully");
      navigate("/userprofile"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form
        id="registrationForm"
        onSubmit={onSubmit}
        className="w-full max-w-lg space-y-4"
      >
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            onChange={onInputChange}
            value={formData.fullname}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onInputChange}
            value={formData.email}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onInputChange}
            value={formData.password}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={onInputChange}
            value={formData.phone}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
