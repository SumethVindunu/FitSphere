import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewStates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">View States</h1>

      <button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
        onClick={() => navigate('/addstatus')}
      >
        Add Status
      </button>
    </div>
  );
};

export default ViewStates;
