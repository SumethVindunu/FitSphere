import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewStates = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all statuses
    const fetchStatuses = async () => {
      try {
        const response = await fetch('http://localhost:8080/status');
        if (!response.ok) {
          throw new Error('Failed to fetch statuses');
        }
        const data = await response.json();
        setStatuses(data);
      } catch (err) {
        console.error('Error fetching statuses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-gray-600">Loading statuses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">View Statuses</h1>
        <button
          onClick={() => navigate('/addstatus')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
        >
          Add Status
        </button>
      </div>

      {statuses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statuses.map((status) => (
            <div
              key={status.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{status.title}</h2>
                <p className="text-gray-600 mb-4">{status.content}</p>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Progress: {status.progressTemplate}</p>
                <p>Date: {new Date(status.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-16">
          No statuses found. Add one!
        </div>
      )}
    </div>
  );
};

export default ViewStates;
