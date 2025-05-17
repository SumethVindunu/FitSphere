import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStatus = () => {
  const navigate = useNavigate();
  const [statusData, setStatusData] = useState({
    userId: '',
    title: '',
    content: '',
    progressTemplate: '',
    date: '',
  });

  const handleChange = (e) => {
    setStatusData({
      ...statusData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/status', statusData);
      navigate('/viewstates'); // change if your route is different
    } catch (error) {
      console.error('Error creating status:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Add New Status</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-2">User ID</label>
            <input
              type="text"
              name="userId"
              value={statusData.userId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={statusData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Content</label>
            <textarea
              name="content"
              value={statusData.content}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Progress Template</label>
            <input
              type="text"
              name="progressTemplate"
              value={statusData.progressTemplate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={statusData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
          >
            Submit Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStatus;
